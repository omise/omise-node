const {assert} = require('chai');
const config = require('./config');
const nock = require('nock');
const omiseInstance = require('../index');

function mockFailedResponse(times) {
  nock('https://api.omise.co')
    .get('/account')
    .times(times)
    .replyWithError('Network error');
}

function mockSuccessResponse() {
  nock('https://api.omise.co')
    .persist()
    .get('/account')
    .reply(200, {
      'object':  'account',
      'id':      'acct_123',
      'email':   'test@omise.co',
      'created': '2015-02-02T13:19:17Z',
    }, {
      'server':       'nginx/1.1',
      'content-type': 'application/json',
    });
}

describe('Omise', function() {
  describe('#Network Retries', function() {
    // Testing when api get success response after failed for 2 times.
    // since maxNetworkRetries is set to 3, it should retry for 3 times
    // and get success response
    it('should be able to retrieve data when maxNetworkRetries is set',
      (done) => {
        // cleaning for previous mock
        nock.cleanAll();

        // setting network failed for 2 times
        mockFailedResponse(2);

        // set network success after 2 times failed
        mockSuccessResponse();

        // override config to set maxNetworkRetries
        const omise = omiseInstance({...config, maxNetworkRetries: 3});

        omise.account.retrieve(function(err, resp) {
          if (err) done(err);
          assert.equal(resp.object, 'account');
          assert.equal(resp.id, 'acct_123');
          assert.equal(resp.email, 'test@omise.co');
          done();
        });
      });

    it('should throw error when maxNetworkRetries is not set', (done) => {
      // cleaning for previous mock
      nock.cleanAll();

      // mock api to throw network error
      mockFailedResponse(1);

      const omise = omiseInstance(config);

      omise.account.retrieve(function(err, resp) {
        assert.equal(err.message, 'Network error');
        assert.typeOf(err, 'Error');
        done();
      });
    });

    it('testing for normal behavior when maxNetworkRetries is set ', (done) => {
      // cleaning for previous mock
      nock.cleanAll();

      // mock api to throw success response
      mockSuccessResponse();

      // set maxNetworkRetries to 3
      const omise = omiseInstance({...config, maxNetworkRetries: 3});

      omise.account.retrieve(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'account');
        assert.equal(resp.id, 'acct_123');
        assert.equal(resp.email, 'test@omise.co');
        done();
      });
    });

    it('should throw error when failed response is over maxNetworkRetries',
      (done) => {
        // cleaning previous mock
        nock.cleanAll();

        // mock failed for 2 times
        mockFailedResponse(2);

        // success response after 2 times failed
        mockSuccessResponse();

        // set maxNetworkRetries to 1
        const omise = omiseInstance({...config, maxNetworkRetries: 1});

        omise.account.retrieve(function(err, resp) {
          assert.equal(err.message, 'Network error');
          assert.typeOf(err, 'Error');
          done();
        });
      });
  });
});

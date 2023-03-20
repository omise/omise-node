const {expect, assert} = require('chai');
const config = require('./config');
const omise  = require('../index')(config);
const testHelper = require('./testHelper');
const nock = require('nock');

describe('Omise', function() {
  describe('#Balance', function() {
    it('should not raise exception connection to Omise is failed',
      function(done) {
        nock('https://api.omise.co')
          .get('/balance')
          .reply(1001, 'DNS resolution error');
        try {
          omise.balance.retrieve(function(err) {
            if (err) {
              done();
            } else {
              done('Server is wrecked');
            }
          });
        } catch (err) {
          done(err);
        }
      });

    it('should be able to retrieve a balance', function(done) {
      testHelper.setupMock('balance_retrieve');
      omise.balance.retrieve(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'balance');
        expect(resp.available).not.be.null;
        expect(resp.total).not.be.null;
        assert.equal(resp.currency, 'thb');
        done();
      });
    });
  });
});

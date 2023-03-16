const {assert} = require('chai');
const config = require('./config');
const omise = require('../index');
const testHelper = require('./testHelper');

const omiseWithCorrectHost = omise({
  ...config, host: 'api.omise.co',
});

const omiseWithWrongHost = omise({
  ...config, host: 'api.xxxxx.co',
});

describe('Omise', function() {
  describe('#Host', function() {
    it('Correct Host should be able to retrieve an account', function(done) {
      testHelper.setupMock('account_retrieve');
      omiseWithCorrectHost.account.retrieve(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'account');
        assert.equal(resp.id, 'acct_123');
        assert.equal(resp.email, 'test@omise.co');
        done();
      });
    });

    it('Wrong Host should return error', function(done) {
      testHelper.setupMock('account_retrieve');
      omiseWithWrongHost.account.retrieve(function(err, resp) {
        assert.typeOf(err, 'Error');
        done();
      });
    });
  });
});

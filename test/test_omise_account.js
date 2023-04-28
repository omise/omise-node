const {assert} = require('chai');
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Account', function() {
    it('should be able to retrieve an account', function(done) {
      testHelper.setupMock('account_retrieve');
      omise.account.retrieve(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'account');
        assert.equal(resp.id, 'acct_123');
        assert.equal(resp.email, 'test@omise.co');
        done();
      });
    });

    it('should be able to update an account', function(done) {
      testHelper.setupMock('account_update');
      omise.account.updateAccount({
        'webhook_uri': 'https://omise.co/webhook',
      }, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'account');
        assert.equal(resp.id, 'acct_123');
        assert.equal(resp.email, 'test@omise.co');
        assert.equal(resp.webhook_uri,
          'https://omise.co/webhook');
        done();
      });
    });
  });
});

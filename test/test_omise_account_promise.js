const {assert} = require('chai');
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Account', function() {
    it('should be able to retrieve an account using async await', async () => {
      testHelper.setupMock('account_retrieve');
      let resp = await omise.account.retrieve();
      assert.equal(resp.object, 'account');
      assert.equal(resp.id, 'acct_123');
      assert.equal(resp.email, 'test@omise.co');
    });

    it('should be able to retrieve an account using .then', async () => {
      testHelper.setupMock('account_retrieve');
      omise.account.retrieve().then((resp) => {
        assert.equal(resp.object, 'account');
        assert.equal(resp.id, 'acct_123');
        assert.equal(resp.email, 'test@omise.co');
      });
    });

    it('should be able to use promise with and .done() .error()', (done) => {
      testHelper.setupMock('account_retrieve');
      omise.account.retrieve()
        .then((resp) => {
          assert.equal(resp.object, 'account');
          assert.equal(resp.id, 'acct_123');
          assert.equal(resp.email, 'test@omise.co');
          done();
        })
        .error((err) => {
          done(err);
        })
        .done();
    });
  });
});

const chai = require('chai');
const expect = chai.expect;
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Account', function() {
    it('should be able to retrieve an account using async await', async () => {
      testHelper.setupMock('account_retrieve');
      let resp = await omise.account.retrieve();
      expect(resp.object, 'account');
      expect(resp.id, 'acct_123');
      expect(resp.email, 'test@omise.co');
    });

    it('should be able to retrieve an account using .then', async () => {
      testHelper.setupMock('account_retrieve');
      omise.account.retrieve().then((resp) => {
        expect(resp.object, 'account');
        expect(resp.id, 'acct_123');
        expect(resp.email, 'test@omise.co');
      });
    });
  });
});

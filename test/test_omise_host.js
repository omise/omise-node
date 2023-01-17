var chai = require('chai');
var expect = chai.expect;
var config = require('./config');
var Omise = require('../index');
var testHelper = require('./testHelper');

const omiseWithCorrectHost = Omise({
  ...config, host: 'api.omise.co'
})

const omiseWithWrongHost = Omise({
  ...config, host: 'api.xxxxx.co'
})

describe('Omise', function () {
  describe('#Host', function () {
    it('Correct Host should be able to retrieve an account', function (done) {
      testHelper.setupMock('account_retrieve');
      omiseWithCorrectHost.account.retrieve(function (err, resp) {
        expect(resp.object, 'account');
        expect(resp.id, 'acct_123');
        expect(resp.email, 'test@omise.co');
        done(err);
      });
    });

    it('Wrong Host should return error', function (done) {
      testHelper.setupMock('account_retrieve');
      omiseWithWrongHost.account.retrieve(function (err, resp) {
        expect(err.object, 'error');
        done()
      });
    });
  });
});

var chai   = require('chai');
var expect = chai.expect;
var config = require('./config');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Transactions', function() {
    var transactionId = '';
    it('should be able to list all transactions', function(done) {
      testHelper.setupMock('transactions_list');
      omise.transactions.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data['0'].object, 'transaction');
        transactionId = resp.data['0'].id;
        done(err);
      });
    });

    it('should be able to retrieve a transaction', function(done) {
      testHelper.setupMock('transaction_retrieve');
      omise.transactions.retrieve(transactionId, function(err, resp) {
        expect(resp.object, 'transaction');
        expect(resp.id).to.match(/^trxn_test/);
        expect(resp.amount, 96094);
        done(err);
      });
    });
  });
});

const {expect, assert} = require('chai');
const config = require('./config');
const omise  = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Transactions', function() {
    let transactionId = '';
    it('should be able to list all transactions', function(done) {
      testHelper.setupMock('transactions_list');
      omise.transactions.list(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'list');
        assert.equal(resp.data['0'].object, 'transaction');
        transactionId = resp.data['0'].id;
        done();
      });
    });

    it('should be able to retrieve a transaction', function(done) {
      testHelper.setupMock('transaction_retrieve');
      omise.transactions.retrieve(transactionId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'transaction');
        expect(resp.id).to.match(/^trxn_test/);
        assert.equal(resp.amount, 96094);
        done();
      });
    });
  });
});

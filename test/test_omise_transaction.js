var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#transactions', function() {
    it('should be able to list all transactions', function(done) {
      testHelper.setupMock('transactions_list');
      omise.transactions.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data['0'].object, 'transaction');
        done();
      });
    });
  })
})

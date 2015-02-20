var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#transfers', function() {
    it('should be able to create transfer', function(done) {
      testHelper.setupMock('transfers_create');
      var data = {
        'amount': '4000'
      };
      omise.transfers.create(data, function(err, resp) {
        expect(resp.object).equal('transfer');
        expect(resp.amount).equal(4000);
        var transferId = resp.id;
        transferId.should.not.be.nil;
        done();
      });
    });

    it('should be able to list all transfers', function(done) {
      testHelper.setupMock('transfers_list');
      omise.transfers.list(function(err, resp) {
        expect(resp.object, 'transfer');
      });
      done();
    });

    it('should be able to retrieve an existing transfer', function(done) {
      testHelper.setupMock('transfers_retrieve');
      var transferId = 'trsf_test_4z4cw3ku87retguciji';
      omise.transfers.retrieve(transferId, function(err, resp) {
        expect(resp.object, 'transfer');
        var amount = resp.amount;
        amount.should.equal(4000);
      });
      done();
    });

    it('should be able to update an existing transfer', function(done) {
      testHelper.setupMock('transfers_update');
      var transferId = 'trsf_test_4z4cw3ku87retguciji';
      var data = {
        'amount': 5000
      };
      omise.transfers.update(transferId, data, function(err, resp) {
        expect(resp.object, 'transfer');
        var amount = resp.amount;
        amount.should.equal(5000);
      });
      done();
    });
  })
})

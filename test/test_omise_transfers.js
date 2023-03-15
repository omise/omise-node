const chai   = require('chai');
const expect = chai.expect;
const config = require('./config');
const omise  = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Transfers', function() {
    let transferId = '';

    it('should be able to list all transfers', function(done) {
      testHelper.setupMock('transfers_create');
      const data = {'amount': '4000'};
      omise.transfers.create(data, function() {
        testHelper.setupMock('transfers_list');
        omise.transfers.list(function(err, resp) {
          expect(resp.object, 'transfer');
          transferId = resp.data[0].id;
          done(err);
        });
      });
    });

    it('should be able to retrieve an existing transfer', function(done) {
      testHelper.setupMock('transfers_retrieve');
      omise.transfers.retrieve(transferId, function(err, resp) {
        expect(resp.object, 'transfer');
        expect(resp.amount).not.null;
        done();
      });
    });

    it('should be able to update an existing transfer', function(done) {
      testHelper.setupMock('transfers_update');
      const data = {'amount': 5000};
      omise.transfers.update(transferId, data, function(err, resp) {
        expect(resp.object, 'transfer');
        const amount = resp.amount;
        amount.should.equal(5000);
        done(err);
      });
    });

    it('should be able to destroy an existing transfer', function(done) {
      testHelper.setupMock('transfers_destroy');
      omise.transfers.destroy(transferId, function(err, resp) {
        expect(resp.object, 'transfer');
        expect(resp.deleted).to.be.true;
        done(err);
      });
    });
  });
});

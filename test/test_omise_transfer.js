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

    //it('should be able to list all transfers', function(done) {
      //testHelper.setupMock('transfers_list');
      //omise.transfers.list(function(err, resp) {
        //expect(resp.object, 'transfer');
      //});
      //done();
    //});

    //it('should be able to retrieve an existing transfer', function(done) {
      //testHelper.setupMock('transfer_retrieve');
      //var transferId = 'cust_test_4z33o46lqreryhqua8w';
      //omise.transfers.retrieve(transferId, function(err, resp) {
        //expect(resp.object, 'list');
        //expect(resp.data).to.be.instanceof(Array);
      //});
      //done();
    //});

    //it('should be able to destroy an existing transfer', function(done) {
      //testHelper.setupMock('transfer_delete');
      //var transferId = 'cust_test_4yygdeiu4ko863sxts9';
      //omise.transfers.destroy(transferId, function(err, resp) {
        //expect(resp.object, 'transfer');
        //expect(resp.deleted).to.be.true;
      //});
      //done();
    //});

    //it('should be able to update an existing transfer', function(done) {
      //testHelper.setupMock('transfer_update');
      //var transferId = 'cust_test_4z2owmajzsb3c527wj7';
      //omise.transfers.update(transferId, function(err, resp) {
        //expect(resp.object, 'transfer');
        //expect(resp.description, 'New description');
      //});
      //done();
    //});
  })
})

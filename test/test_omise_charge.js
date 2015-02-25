var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#charges', function() {
    it('should be able to create a charge', function(done) {
      testHelper.setupMock('charges_create');
      var charge = { 'description': 'Charge for order 3947',
                     'amount': '100000',
                     'currency': 'thb',
                     'card': 'token_id'
      };
      omise.charges.create(charge, function(err, resp) {
        expect(resp.object, 'charge');
        var chargeId = resp.id;
        chargeId.should.be.equal('chrg_test_4z429hvnv7ouolu6kmp');
        expect(resp.capture).be.true;
        expect(resp.captured).be.true;
        done();
      });
    });

    it('should be able to list charges', function(done) {
      testHelper.setupMock('charges_list');
      omise.charges.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp).to.have.property('data');
        expect(resp.data).to.be.a('array');
        done();
      });
    });

    it('should be able to retrieve a charge', function(done) {
      testHelper.setupMock('charges_retrieve');
      var chargeId = 'chrg_test_4z429hvnv7ouolu6kmp';
      omise.charges.retrieve(chargeId, function(err, resp) {
        expect(resp.object, 'charge');
        expect(resp).to.have.property('amount');
        resp.amount.should.equal(100000);
      });
      done();
    });

    it('should be able to update a charge', function(done) {
      testHelper.setupMock('charges_update');
      var chargeId = 'chrg_test_4z429hvnv7ouolu6kmp';
      var data = {description: 'test description'};
      omise.charges.update(chargeId, data, function(err, resp) {
        expect(resp.object, 'charge');
        var chargeId = resp.id;
        chargeId.should.be.equal('chrg_test_4z429hvnv7ouolu6kmp');
        expect(resp.description, 'test description');
      });
      done();
    });

    it('should be able to capture a charge', function(done) {
      testHelper.setupMock('charges_capture');
      var chargeId = 'chrg_test_4z429hvnv7ouolu6kmp';
      var data = {description: 'test description'};
      omise.charges.capture(chargeId, function(err, resp) {
        expect(resp.object, 'charge');
        var captured = resp.captured;
        captured.should.be.true;
      });
      done();
    });
  })
})

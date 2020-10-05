'use strict';
var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Charges', function() {
    var tokenId  = '';
    var chargeId = '';
    before(function(done) {
      testHelper.setupMock('tokens_create');
      var cardDetails = {
        'card': {
          'name':             'JOHN DOE',
          'city':             'Bangkok',
          'postal_code':      10320,
          'number':           '4242424242424242',
          'expiration_month': 2,
          'expiration_year':  2017,
          'security_code':    123,
        },
      };
      omise.tokens.create(cardDetails, function(err, resp) {
        should.exist(resp.id);
        tokenId = resp.id;
        expect(tokenId).to.contains('tokn_test');
        should.exist(resp.card.id);
        var cardId = resp.card.id;
        expect(cardId).to.contains('card_test');
        done(err);
      });
    });

    it('should be able to create a charge', function(done) {
      testHelper.setupMock('charges_create');
      var charge = {
        'description': 'Charge for order 3947',
        'amount':      '100000',
        'currency':    'thb',
        'capture':     false,
        'card':        tokenId,
      };
      omise.charges.create(charge, function(err, resp) {
        expect(resp.object, 'charge');
        chargeId = resp.id;
        expect(chargeId).to.match(/^chrg_test/);
        expect(resp.capture).be.false;
        expect(resp.paid).be.false;
        done(err);
      });
    });

    it('should be able to reverse a charge', function(done) {
      testHelper.setupMock('charges_reverse');
      omise.charges.reverse(chargeId, function(err, resp) {
        expect(resp.object, 'charge');
        var reversed = resp.reversed;
        reversed.should.be.true;
        done(err);
      });
    });

    it('should be able to expire a charge', function(done) {
      testHelper.setupMock('charge_expire');
      omise.charges.expire(chargeId, function(err, resp) {
        expect(resp.object, 'charge');
        expect(resp.expired).be.true;
        done(err);
      });
    });

    it('should be able to list charges', function(done) {
      testHelper.setupMock('charges_list');
      omise.charges.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp).to.have.property('data');
        expect(resp.data).to.be.a('array');
        done(err);
      });
    });

    it('should be able to limit charges list', function(done) {
      testHelper.setupMock('charges_list_data');
      omise.charges.list({limit: 1}, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp).to.have.property('data');
        expect(resp.data).to.be.a('array');
        resp.limit.should.equal(1);
        done(err);
      });
    });

    it('should be able to retrieve a charge', function(done) {
      testHelper.setupMock('charges_retrieve');
      omise.charges.retrieve(chargeId, function(err, resp) {
        expect(resp.object, 'charge');
        expect(resp).to.have.property('amount');
        resp.amount.should.equal(100000);
        done(err);
      });
    });

    it('should be able to update a charge', function(done) {
      testHelper.setupMock('charges_update');
      var data = {description: 'test description'};
      omise.charges.update(chargeId, data, function(err, resp) {
        expect(resp.object, 'charge');
        var chargeId = resp.id;
        expect(chargeId).to.match(/^chrg_test/);
        expect(resp.description, 'test description');
        done(err);
      });
    });

    it('should be able to capture a charge', function(done) {
      testHelper.setupMock('charges_capture');
      omise.charges.capture(chargeId, function(err, resp) {
        expect(resp.object, 'charge');
        var paid = resp.paid;
        paid.should.be.true;
        done(err);
      });
    });
  });
});

'use strict';
var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Customers', function() {
    var tokenId    = '';
    var customerId = '';
    before(function(done) {
      testHelper.setupMock('tokens_create');
      var cardDetails = {
        'card':{
          'name': 'JOHN DOE',
          'city': 'Bangkok',
          'postal_code': 10320,
          'number': '4242424242424242',
          'expiration_month': 2,
          'expiration_year': 2017,
          'security_code': 123
        }
      };
      omise.tokens.create(cardDetails, function(err, resp) {
        should.exist(resp.id);
        tokenId = resp.id;
        expect(tokenId).to.contains('tokn_test');
        should.exist(resp.card.id);
        var cardId  = resp.card.id;
        expect(cardId).to.contains('card_test');
        done();
      });
    });

    it('should be able to create customer', function(done) {
      testHelper.setupMock('customers_create');
      var data = {
        email: 'john.doe@example.com',
        description: 'John Doe (id: 30)',
        card: tokenId
      };
      omise.customers.create(data, function(err, resp) {
        customerId = resp.id;
        expect(customerId).to.contains('cust_test');
        var obj = resp.object;
        obj.should.equal('customer');
        var email = resp.email;
        email.should.equal('john.doe@example.com');
        done();
      });
    });

    it('should be able to create and capture charge using customer ID',
      function(done) {
        testHelper.setupMock('charges_create');
        var charge = { 'description': 'Charge for order 3948',
                       'amount': '100000',
                       'currency': 'thb',
                       'capture': false,
                       'customer': customerId };
        omise.charges.create(charge, function(err, resp) {
          expect(resp.object, 'charge');
          var chargeId = resp.id;
          expect(chargeId).to.match(/^chrg_test/);
          expect(resp.capture).be.false;
          expect(resp.paid).be.false;
          done();
        });
      }
    );

    it('should be able to create and capture charge again using token',
      function(done) {
        testHelper.setupMock('tokens_create');
        var cardDetails = {
          'card':{
            'name': 'JOHN DOE',
            'city': 'Bangkok',
            'postal_code': 10320,
            'number': '4242424242424242',
            'expiration_month': 2,
            'expiration_year': 2017,
            'security_code': 123
          }
        };
        omise.tokens.create(cardDetails, function(err, resp) {
          should.exist(resp.id);
          tokenId = resp.id;
          expect(tokenId).to.contains('tokn_test');
          should.exist(resp.card.id);
          var cardId  = resp.card.id;
          expect(cardId).to.contains('card_test');
          testHelper.setupMock('charges_create');

          var charge = { 'description': 'Charge for order 3949',
                         'amount': '100000',
                         'currency': 'thb',
                         'capture': false,
                         'card': tokenId };
          omise.charges.create(charge, function(err, resp) {
            expect(err).to.equal(null, err !== null ? err.message : null);
            expect(resp.object, 'charge');
            var chargeId = resp.id;
            expect(chargeId).to.match(/^chrg_test/);
            expect(resp.capture).be.false;
            expect(resp.paid).be.false;
            done();
          });
        });
      }
    );

    it('should be able to list all customers', function(done) {
      testHelper.setupMock('customers_list');
      omise.customers.list(function(err, resp) {
        expect(resp.object, 'customer');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'card');
        done();
      });
    });

    it('should be able to retrieve an existing customer', function(done) {
      testHelper.setupMock('customer_retrieve');
      omise.customers.retrieve(customerId, function(err, resp) {
        expect(resp.object, 'customer');
        expect(resp.id).to.match(/^cust_test/);
        expect(resp.email, 'john.doe@example.com');
        done();
      });
    });

    it('should be able to update an existing customer', function(done) {
      testHelper.setupMock('customer_update');
      var data = {
        description: 'New description',
      };
      omise.customers.update(customerId, data, function(err, resp) {
        expect(resp.object, 'customer');
        expect(resp.description, 'New description');
        done();
      });
    });

    it('should be able to destroy an existing customer', function(done) {
      testHelper.setupMock('customers_destroy');
      omise.customers.destroy(customerId, function(err, resp) {
        expect(resp.object, 'customer');
        expect(resp.deleted).to.be.true;
        done();
      });
    });

  });
});

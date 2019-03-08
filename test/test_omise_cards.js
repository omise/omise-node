var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Cards', function() {
    var tokenId = '';
    var customerId = '';
    var cardId = '';

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

    it('should be able to create a customer', function(done) {
      testHelper.setupMock('customers_create');
      var data = {
        email:       'john.doe@example.com',
        description: 'John Doe (id: 30)',
        card:        tokenId,
      };
      omise.customers.create(data, function(err, resp) {
        customerId = resp.id;
        expect(customerId).to.contains('cust_test');
        var obj = resp.object;
        obj.should.equal('customer');
        var email = resp.email;
        email.should.equal('john.doe@example.com');
        done(err);
      });
    });

    it('should be able to list all cards', function(done) {
      testHelper.setupMock('cards_list');
      omise.customers.listCards(customerId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'card');
        cardId = resp.data[0].id;
        done(err);
      });
    });

    it('should be able to retrieve a card', function(done) {
      testHelper.setupMock('card_retrieve');
      omise.customers.retrieveCard(customerId, cardId, function(err, resp) {
        expect(resp.object, 'card');
        expect(resp.id).to.match(/^card_test/);
        expect(resp.brand, 'Visa');
        done(err);
      });
    });

    it('should be able to update a card', function(done) {
      testHelper.setupMock('card_update');
      var data = {'expiration_year': 2022};
      omise.customers.updateCard(customerId, cardId, data, function(err, resp) {
        expect(resp.object, 'card');
        expect(resp.id, 'card_test_4z2owrdmvbygi7ah0fu');
        expect(resp.brand, 'Visa');
        done(err);
      });
    });

    it('should be able to destroy a card', function(done) {
      testHelper.setupMock('card_destroy');
      omise.customers.destroyCard(customerId, cardId, function(err, resp) {
        expect(resp.object, 'card');
        expect(resp.id, 'card_test_4z2owrdmvbygi7ah0fu');
        resp.deleted.should.be.true;
        done(err);
      });
    });
  });
});

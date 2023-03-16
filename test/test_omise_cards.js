const {expect, assert, should} = require('chai');
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Cards', function() {
    let tokenId = '';
    let customerId = '';
    let cardId = '';

    before(function(done) {
      testHelper.setupMock('tokens_create');
      const cardDetails = {
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
        if (err) done(err);
        should().exist(resp.id);
        tokenId = resp.id;
        expect(tokenId).to.contains('tokn_test');
        should().exist(resp.card.id);
        const cardId = resp.card.id;
        expect(cardId).to.contains('card_test');
        done();
      });
    });

    it('should be able to create a customer', function(done) {
      testHelper.setupMock('customers_create');
      const data = {
        email:       'john.doe@example.com',
        description: 'John Doe (id: 30)',
        card:        tokenId,
      };
      omise.customers.create(data, function(err, resp) {
        if (err) done(err);
        customerId = resp.id;
        expect(customerId).to.contains('cust_test');
        const obj = resp.object;
        obj.should.equal('customer');
        const email = resp.email;
        email.should.equal('john.doe@example.com');
        done();
      });
    });

    it('should be able to list all cards', function(done) {
      testHelper.setupMock('cards_list');
      omise.customers.listCards(customerId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        assert.equal(resp.data[0].object, 'card');
        cardId = resp.data[0].id;
        done();
      });
    });

    it('should be able to retrieve a card', function(done) {
      testHelper.setupMock('card_retrieve');
      omise.customers.retrieveCard(customerId, cardId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'card');
        expect(resp.id).to.match(/^card_test/);
        assert.equal(resp.brand, 'Visa');
        done();
      });
    });

    it('should be able to update a card', function(done) {
      testHelper.setupMock('card_update');
      const data = {'expiration_year': 2022};
      omise.customers.updateCard(customerId, cardId, data, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'card');
        assert.equal(resp.id, 'card_test_4z2owrdmvbygi7ah0fu');
        assert.equal(resp.brand, 'Visa');
        done();
      });
    });

    it('should be able to destroy a card', function(done) {
      testHelper.setupMock('card_destroy');
      omise.customers.destroyCard(customerId, cardId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'card');
        assert.equal(resp.id, 'card_test_4z2owrdmvbygi7ah0fu');
        resp.deleted.should.be.true;
        done();
      });
    });
  });
});

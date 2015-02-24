var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#cards', function() {
    it('should be able to list all cards', function(done) {
      testHelper.setupMock('cards_list');
      var customerId = 'cust_test_4z2owmajzsb3c527wj7';
      omise.customers.listCards(customerId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'card');
        done();
      });
    });

    it('should be able to retrieve a card', function(done) {
      testHelper.setupMock('card_retrieve');
      var customerId = 'cust_test_4z2owmajzsb3c527wj7';
      var cardId = 'card_test_4z2owrdmvbygi7ah0fu';
      omise.customers.retrieveCard(customerId, cardId, function(err, resp) {
        expect(resp.object, 'card');
        expect(resp.id, 'card_test_4z2owrdmvbygi7ah0fu');
        expect(resp.brand, 'Visa');
        done();
      });
    });
  })
})

var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#tokens', function() {
    it('should be able to create token', function(done) {
      testHelper.setupMock('tokens_create');
      var cardDetails = {
        'card':{
          'name': 'JOHN DOE',
          'city': 'Bangkok',
          'postal_code': 10320,
          'number': '4242424242424242',
          'expiration_month': 2,
          'expiration_year': 2017
        }
      };
      omise.tokens.create(cardDetails, function(err, resp) {
        should.exist(resp.id);
        var tokenId = resp.id;
        expect(tokenId).to.contains('tokn_test');
        should.exist(resp.card.id);
        var cardId  = resp.card.id;
        expect(cardId).to.contains('card_test');
        done();
      });
    });

    it('should be able to retrieve a token', function(done) {
      testHelper.setupMock('token_retrieve');
      var tokenId = 'tokn_test_4z69sehi504pxca6umk';
      omise.tokens.retrieve(tokenId, function(err, resp) {
        should.exist(resp.id);
        expect(resp.id).to.contains('tokn_test_4z69sehi504pxca6umk');
        should.exist(resp.card.id);
        var cardId  = resp.card.id;
        expect(cardId).to.contains('card_test');
        done();
      });
    })
  })
})

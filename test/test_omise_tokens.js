var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Tokens', function() {
    var tokenId = '';
    before(function(done) {
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
      testHelper.setupMock('tokens_create');
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

    it('should be able to retrieve a token', function(done) {
      testHelper.setupMock('token_retrieve');
      omise.tokens.retrieve(tokenId, function(err, resp) {
        should.exist(resp.id);
        expect(resp.id).to.match(/^tokn_test/);
        should.exist(resp.card.id);
        var cardId = resp.card.id;
        expect(cardId).to.contains('card_test');
        done(err);
      });
    });
  });
});

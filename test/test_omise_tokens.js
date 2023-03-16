const {expect, should} = require('chai');
const config = require('./config');
const omise  = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Tokens', function() {
    let tokenId = '';
    before(function(done) {
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
      testHelper.setupMock('tokens_create');
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

    it('should be able to retrieve a token', function(done) {
      testHelper.setupMock('token_retrieve');
      omise.tokens.retrieve(tokenId, function(err, resp) {
        if (err) done(err);
        should().exist(resp.id);
        expect(resp.id).to.match(/^tokn_test/);
        should().exist(resp.card.id);
        const cardId = resp.card.id;
        expect(cardId).to.contains('card_test');
        done(err);
      });
    });
  });
});

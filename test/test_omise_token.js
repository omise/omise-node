var chai = require('chai'),
   expect = chai.expect,
   should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);

setTimeout(3000);
describe('Omise', function() {
    describe('#token', function() {
        it('should be able to create token', function(done) {
            var card_details = {
            'card[name]': 'JOHN DOE',
            'card[city]': 'Bangkok',
            'card[postal_code]': 10320,
            'card[number]': '4242424242424242',
            'card[expiration_month]': 2,
            'card[expiration_year]': 2017
            };
            omise.tokens.create(card_details, function(err, resp){
                var token = resp.card.id;
                should.exist(resp.card);
                expect(token).to.contain('card_test');
                setTimeout(done, 1500); //TODO: NOCK_OFF=true
            });
        })
    })
})

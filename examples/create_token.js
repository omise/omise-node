//create token
'use strict';
var config = {
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY
};

var omise = require('omise-node')(config);

var card_details = {
  'card[name]': 'JOHN DOE',
  'card[city]': 'Bangkok',
  'card[postal_code]': 10320,
  'card[number]': '4242424242424242',
  'card[expiration_month]': 2,
  'card[expiration_year]': 2017
};

omise.tokens.create(card_details, function(err, resp){
  var token_id = resp.card.id;
  console.log(token_id);
});

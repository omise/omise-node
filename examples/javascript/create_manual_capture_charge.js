'use strict';

const omise = require('./index');

let cardDetails = {
  card: {
    name: "Gaurav",
    number: "4242424242424242",
    expiration_month: 2,
    expiration_year: 2025,
    security_code: "123",
  },
};

omise.tokens.create(cardDetails, function(err, token) {
  if (err) {
    console.log('error', err);
    return;
  }

  omise.charges.create({
    amount:     900000,
    currency:   'thb',
    return_uir: 'http://example.com',
    card:       token.id,
    capture: false,
  }, function(err, charge) {
    if (err) {
      console.log('error', err);
      return;
    }

    console.log('charge', charge);
  });
});

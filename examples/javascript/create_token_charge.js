'use strict';

const omise = require('./index');

let cardDetails = {
  card: {
    'name':             'JOHN DOE',
    'city':             'Bangkok',
    'postal_code':      10160,
    'number':           '4532156433142865',
    'expiration_month': 8,
    'expiration_year':  2032,
    'email': 'test@example.com'
  },
};

omise.tokens.create(cardDetails, function(err, token) {
  if (err) {
    console.log('error', err);
    return;
  }

  omise.charges.create({
    amount:     10000,
    currency:   'thb',
    return_uir: 'http://example.com',
    card:       token.id,
    metadata:   {
      note: 'test card',
    },
  }, function(err, charge) {
    if (err) {
      console.log('error', err);
      return;
    }

    console.log('charge', charge);
  });
});

'use strict';

var omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

var cardDetails = {
  card: {
    'name':             'JOHN DOE',
    'city':             'Bangkok',
    'postal_code':      10320,
    'number':           '4242424242424242',
    'expiration_month': 2,
    'expiration_year':  2017,
  },
};

omise.tokens.create(cardDetails).then(function(token) {
  console.log(token);
  return omise.customers.create({
    'email':       'john.doe@example.com',
    'description': 'John Doe (id: 30)',
    'card':        token.id,
  });
}).then(function(customer) {
  console.log(customer);
  return omise.charges.create({
    'amount':   10000,
    'currency': 'thb',
    'customer': customer.id,
  });
}).then(function(charge) {
  console.log(charge);
}).error(function(err) {
  console.log(err);
}).done();

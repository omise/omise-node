'use strict';

let omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

let cardDetails = {
  card: {
    'name':             'JOHN DOE',
    'city':             'Bangkok',
    'postal_code':      10320,
    'number':           '4242424242424242',
    'expiration_month': 2,
    'expiration_year':  2024,
  },
};
//Auto capture a charge
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
}).catch(function(err) {
  console.log(err);
}).finally();

// Manually capture a charge
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
    'authorization_type': 'pre_auth',
    'capture': false,
  });
}).then(function(charge) {
  console.log(charge);
  omise.charges.capture(charge.id).then(function(capturedCharge){
    console.log(capturedCharge);
  })
}).catch(function(err) {
  console.log(err);
}).finally();

// Partially capture a charge
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
    'authorization_type': 'pre_auth',
    'capture': false,
  });
}).then(function(charge) {
  console.log(charge);
  omise.charges.capture(charge.id,{'capture_amount': charge.amount / 2}).then(function(partiallyCapturedCharge){
    console.log(partiallyCapturedCharge);
  })
}).catch(function(err) {
  console.log(err);
}).finally();

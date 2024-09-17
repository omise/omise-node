'use strict';

const omise = require('./index');

let amount = 500000;
let currency = 'thb';
let source = {
  'type':     'internet_banking_bbl',
  'amount':   500000,
  'currency': 'thb',
};

omise.sources.create(source).then(function(resSource) {
  return omise.charges.create({
    'amount':     amount,
    'source':     resSource.id,
    'currency':   currency,
    'return_uri': 'https://omise.co',
  });
}).then(function(charge) {
  console.log(charge);
}).catch(function(err) {
  console.log(err);
});

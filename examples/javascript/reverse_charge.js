'use strict';

const omise = require('./index');

const chargeId = 'chrg_611rkd55yyxy6a8vs3c'
omise.charges.reverse(chargeId, function(err, response) {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(response)
});

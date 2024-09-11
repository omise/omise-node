'use strict';

const omise = require('./index');

const chargeId = 'chrg_611rj6nuzljvtrudfks'
omise.charges.capture(chargeId, function(err, response) {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(response)
});

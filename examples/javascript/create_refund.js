'use strict';

const omise = require('./index');

const chargeId = 'chrg_611ra3ab9wmcrm5wmue';
omise.charges.createRefund(chargeId, { amount: 200000 }, function(err, resp) {
  if(err) {
    console.log(err)
  }
  console.log(resp);
});

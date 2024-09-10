'use strict';

const omise = require('./index');

omise.customers.destroy('cust_60458v5p9fhyx3z4yp7', function(err, resp) {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

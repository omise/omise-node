'use strict';

const omise = require('./index');

omise.customers.retrieve('cust_60dw2h7vc8pwuiy9hag', function(err, resp) {
  console.log(resp);
});

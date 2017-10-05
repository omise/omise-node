'use strict';

var omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

omise.customers.retrieve('cust_test_4z33o46lqreryhqua8w', function(err, resp) {
  console.log(resp);
});

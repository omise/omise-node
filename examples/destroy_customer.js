'use strict';

var omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

omise.customers.destroy('cust_test_4yxn6vblxh83h605oxz', function(err, resp) {
  console.log(resp);
});

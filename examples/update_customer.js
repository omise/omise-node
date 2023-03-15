'use strict';

let omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

let updateParams = {description: 'the other description'};

omise.customers.update('cust_test_4z2owmajzsb3c527wj7', updateParams,
  function(err, resp) {
    console.log(resp);
  });

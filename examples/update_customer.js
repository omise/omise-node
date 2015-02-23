//update
'use strict';
var config = {
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY
};

var omise = require('omise-node')(config);
var customerId = 'cust_test_4z2owmajzsb3c527wj7';
omise.customers.update(customerId, {description: 'the other description'}, function(err, resp) {
  console.log(resp);
});

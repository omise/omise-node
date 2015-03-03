'use strict';

var omise = require('../index')({
  'publicKey': 'pkey_test_4yyg6ko1yl82hlh1hmt',
  'secretKey': 'skey_test_4yyg6l9b9lbcjknr418'
});

omise.customers.retrieve("cust_test_4z33o46lqreryhqua8w", function(err, resp) {
  console.log(resp);
});

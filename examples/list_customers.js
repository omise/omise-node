//list customers
'use strict';
var config = {
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY
};

var omise = require('omise-node')(config);
omise.customers.list(function(err, resp) {
  console.log(resp);
});

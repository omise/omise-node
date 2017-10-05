'use strict';

var omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

omise.charges.list({limit: 2}, function(err, resp) {
  console.log(resp);
});

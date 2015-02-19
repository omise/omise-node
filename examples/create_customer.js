"use strict";
var config = {
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY
};

var omise = require('../index')(config);

var customer = {
  email: "john.doe@example.com",
  description: "John Doe (id: 30)",
  // card: "tokn_test_4z2w04h2a0v4dmf0arl"  //with token
};
omise.customers.create(customer, function(err, resp) {
  console.log(resp);
});

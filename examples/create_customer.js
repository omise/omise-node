'use strict';

var omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

var customer = {
  email:       'john.doe@example.com',
  description: 'John Doe (id: 30)',
  metadata:     {
    note:       'vip'
  }
};

omise.customers.create(customer, function(err, resp) {
  console.log(resp);
});

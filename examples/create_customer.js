'use strict';

const omise = require('./index');

let customer = {
  email:       'john.doe@example.com',
  description: 'John Doe (id: 30)',
  metadata:    {
    note: 'vip',
  },
};

omise.customers.create(customer, function(err, resp) {
  console.log(resp);
});

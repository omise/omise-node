///<reference path="../index.d.ts"/>

import * as Omise from 'omise';
const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
});

const customer = {
  email: 'john.doe@example.com',
  description: 'John Doe (id: 30)'
};

omise.customers.create(customer, function(err, resp) {
  console.log(resp);
});

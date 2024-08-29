'use strict';

const omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

omise.balance.retrieve((err, resp) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

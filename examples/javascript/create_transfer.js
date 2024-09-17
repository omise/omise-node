'use strict';

const omise = require('./index');

const reqBody = {
  amount: 40000,
  recipient: 'recp_60w95drhxsfzbkr89c4',
  fail_fast: true
};

omise.transfers.create(reqBody, (err, resp) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

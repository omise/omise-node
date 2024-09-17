'use strict';

const omise = require('./index');

omise.balance.retrieve((err, resp) => {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

'use strict';

const omise = require('./index');

omise.schedules.retrieve((err, resp) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(resp);
});

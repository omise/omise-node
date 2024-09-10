'use strict';

const omise = require('./index');

omise.customers.list({limit: 2}, function(err, resp) {
  console.log(resp);
});

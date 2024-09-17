'use strict';

const omise = require('./index');

omise.charges.list({limit: 2}, function(err, resp) {
  console.log(resp);
});

'use strict';

const omise = require('./index');

omise.recipients.list({limit: 2}, function(err, resp) {
  console.log(resp);
});

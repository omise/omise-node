'use strict';

const omise = require('./index');

let link = {
  'amount':      19000,
  'currency':    'thb',
  'multiple':    true,
  'title':       'Cappuccino',
  'description': 'Freshly brewed coffee',
};

omise.links.create(link, function(err, resp) {
  console.log(resp);
});

'use strict';

let omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

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

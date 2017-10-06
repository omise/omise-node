'use strict';

var omise = require('../index')({
  'publicKey': 'pkey_test_597dvdthp1ax5xyir80',
  'secretKey': process.env.OMISE_SECRET_KEY,
});

var source = {
  type:              'installment_kbank',
  amount:            '500000',
  currency:          'thb',
  installment_terms: '4',
};

omise.sources.create(source, function(err, resp) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(resp);
});

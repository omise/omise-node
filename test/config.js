'use strict';

var config = {
  publicKey:    process.env.OMISE_PUBLIC_KEY,
  secretKey:    process.env.OMISE_SECRET_KEY,
  omiseVersion: '2015-09-10',
};

if (process.env.NOCK_OFF && (!config['publicKey'] || !config['secretKey'])) {
  var msg = 'Please set OMISE_PUBLIC_KEY and OMISE_SECRET_KEY env vars ' +
    'for public key and secret key respectively.';
  console.log(msg);
  process.exit(2);
}

module.exports = config;

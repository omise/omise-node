'use strict';

const config = {
  publicKey:    process.env.OMISE_PUBLIC_KEY,
  secretKey:    process.env.OMISE_SECRET_KEY,
  omiseVersion: '2019-09-29',
};

if (process.env.NOCK_OFF && (!config['publicKey'] || !config['secretKey'])) {
  const msg = 'Please set OMISE_PUBLIC_KEY and OMISE_SECRET_KEY env consts ' +
    'for public key and secret key respectively.';
  console.log(msg); // eslint-disable-line
  process.exit(2);
}

module.exports = config;

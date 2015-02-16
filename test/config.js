'use strict';
var sys = require('sys');

var config = {
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
};

if (!config['publicKey'] || !config['secretKey']) {
  console.log('Need Omise key!');
  process.exit(2)
}
module.exports = config;

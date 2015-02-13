'use strict';
var sys = require('sys');

var config = {
  public_key: process.env.OMISE_PUBLIC_KEY,
  secret_key: process.env.OMISE_SECRET_KEY
};

if (!config['public_key'] || !config['secret_key']) {
    console.log('Need Omise key!');
    process.exit(2)
}
module.exports = config;

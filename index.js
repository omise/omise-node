'use strict';
// Omise.co
const resource = require('./lib/apiResources');

const Omise = function(config) {
  return resource.omiseResources(config);
};

// Enums
const Scheme = {
  Http:  'http',
  Https: 'https',
};

const AuthType = {
  PreAuth:   'pre_auth',
  FinalAuth: 'final_auth',
};

const Authentication = {
  Passkey: 'PASSKEY',
  ThreeDS: '3DS',
};

module.exports = Omise;
module.exports.Authentication = Authentication;
module.exports.Scheme = Scheme;
module.exports.AuthType = AuthType;

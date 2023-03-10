'use strict';
// Omise.co
const resource = require('./lib/apiResources');
module.exports = function(config) {
  return resource.omiseResources(config);
};

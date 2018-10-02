'use strict';
// Omise.co
var resource = require('./lib/apiResources');
module.exports = function(config) {
  return resource.omiseResources(config);
};

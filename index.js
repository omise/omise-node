'use strict';
//Omise.co
var resource = require('./lib/apiResources.js');
module.exports = function(config) {
  return resource.omiseResources(config);
};

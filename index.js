'use strict';
//Omise.co
var omiseResources = require('./lib/apiResources.js');
module.exports = function(config) {
  return omiseResources(config);
};

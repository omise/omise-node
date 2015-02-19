'use strict';
var _ = require('lodash');
var omiseConfig;

function resourceName(name) {
  return require(['./resources/', name, '.js'].join(''))(omiseConfig);
}

module.exports.resourcePath = function(path) {
  var resourcePath = path;
  return function(resourceId) {
    return {'path': _.compact([resourcePath, resourceId]).join('/') };
  }
}

module.exports.omiseResources = function(config) {
  omiseConfig = config;
  return {
    tokens: resourceName('Token'),
    customers: resourceName('Customer')
  }
}

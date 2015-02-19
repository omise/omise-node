'use strict';
var omiseConfig;

function resourceName(name) {
  return require(['./resources/', name, '.js'].join(''))(omiseConfig);
}

function omiseResources(config) {
  omiseConfig = config;
  return {
    tokens: resourceName('Token'),
    customers: resourceName('Customer')
  }
}

module.exports = omiseResources;
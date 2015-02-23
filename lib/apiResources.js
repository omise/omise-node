'use strict';
var api = require('./api');
var _   = require('lodash');
var omiseConfig;

function resourceName(name) {
  return require(['./resources/', name, '.js'].join(''))(omiseConfig);
}

function resourcePath (name) {
  var resourcePath = ['/', name].join('');
  return function(resourceId) {
    return {'path': _.compact([resourcePath, resourceId]).join('/') };
  }
}

module.exports.omiseResources = function(config) {
  omiseConfig = config;
  return {
    tokens: resourceName('Token'),
    customers: resourceName('Customer'),
    charges: resourceName('Charge')
  }
}

module.exports.resourceActions = function(name, actions, options) {
  options['host'] = (name === 'tokens') ? 'vault.omise.co' : 'api.omise.co';
  var path = resourcePath(name);
  return _.pick({
    create: function(data, callback) {
      api.post(_.merge(path(), _.merge({'data': data}, options)), callback);
    },
    list: function(callback) {
      api.get(_.merge(path(), options), callback);
    },
    retrieve: function(customerId, callback) {
      api.get(_.merge(path(customerId), options), callback);
    },
    destroy: function(customerId, callback) {
      api.destroy(_.merge(path(customerId), options), callback);
    },
    update: function(customerId, data, callback) {
      api.update(_.merge(path(customerId),
                  _.merge({'data': data}, options)), callback);
    }
  }, actions);
}

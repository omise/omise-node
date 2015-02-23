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
    charges: resourceName('Charge'),
    transfers: resourceName('Transfer')
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
    retrieve: function(resourceId, callback) {
      api.get(_.merge(path(resourceId), options), callback);
    },
    destroy: function(resourceId, callback) {
      api.destroy(_.merge(path(resourceId), options), callback);
    },
    update: function(resourceId, data, callback) {
      api.update(_.merge(path(resourceId),
                  _.merge({'data': data}, options)), callback);
    },
    capture: function(resourceId, callback) {
      api.post(_.merge(path(resourceId), options), callback);
    },
  }, actions);
}

'use strict';
var api = require('./api');
var _   = require('lodash');
var omiseConfig;

function resourceName(name) {
  return require(['./resources/', name, '.js'].join(''))(omiseConfig);
}

function resourcePath (name) {
  var path = name;
  if (name['0'] !== '/') {
    path = ['/', name].join('');
  }
  return function(resourceId) {
    return {'path': _.compact([path, resourceId]).join('/') };
  }
}

function nestedPath(resource, nestedName, nestedId) {
  return resourcePath(
           resourcePath(resource['path'])(nestedName)['path']
         )(nestedId);
}

function _makeOptions(path, data, options) {
  return _.merge(path, data, options)
}

module.exports.omiseResources = function(config) {
  omiseConfig = config;
  return {
    tokens: resourceName('Token'),
    customers: resourceName('Customer'),
    charges: resourceName('Charge'),
    transfers: resourceName('Transfer'),
    account: resourceName('Account'),
    balance: resourceName('Balance')
  }
}

module.exports.resourceActions = function(name, actions, options) {
  var path = resourcePath(name);
  return _.pick({
    create: function(data, callback) {
      api.post(_makeOptions(path(), data, options), callback);
    },
    list: function(callback) {
      api.get(_makeOptions(path(), options), callback);
    },
    retrieve: function(resourceId, callback) {
      if (typeof(resourceId) === 'function') { //ugly hack
        callback = resourceId;
        resourceId = null;
      }
      api.get(_makeOptions(path(resourceId), options), callback);
    },
    destroy: function(resourceId, callback) {
      api.destroy(_makeOptions(path(resourceId), options), callback);
    },
    update: function(resourceId, data, callback) {
      api.update(_makeOptions(path(resourceId), data, options), callback);
    },
    capture: function(resourceId, callback) {
      api.post(_makeOptions(nestedPath(path(resourceId), 'capture'), options),
               callback);
    },
    listCards: function(resourceId, callback) {
      api.get(_makeOptions(nestedPath(path(resourceId), 'cards'), options),
              callback);
    },
    retrieveCard: function(resourceId, cardId, callback) {
      api.get(
        _makeOptions(nestedPath(path(resourceId), 'cards', cardId), options),
        callback);
    },
    updateCard: function(resourceId, cardId, data, callback) {
      api.update(
        _makeOptions(nestedPath(path(resourceId), 'cards', cardId), data,
                     options), callback);
    },
    destroyCard: function(resourceId, cardId, callback) {
      api.destroy(
        _makeOptions(nestedPath(path(resourceId), 'cards', cardId),
                     options), callback);
    },
    createRefund: function(resourceId, data, callback) {
      api.post(_makeOptions(nestedPath(path(resourceId), 'refunds'), data,
                     options), callback);
    },
  }, actions);
}

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

function _nestedPathOptions(opts, pathObj, resource, id, data) {
  if (typeof(id) == 'object') {
    id = null;
    data = id;
  }
  return _makeOptions(opts, nestedPath(pathObj, resource, id), data);
}

function _makeOptions(options, path, data) {
  return _.merge(options, path, data)
}

module.exports.omiseResources = function(config) {
  omiseConfig = config;
  return {
    tokens: resourceName('Token'),
    customers: resourceName('Customer'),
    charges: resourceName('Charge'),
    transfers: resourceName('Transfer'),
    transactions: resourceName('Transaction'),
    account: resourceName('Account'),
    balance: resourceName('Balance')
  }
}

module.exports.resourceActions = function(name, actions, options) {
  var path = resourcePath(name);
  return _.pick({
    create: function(data, callback) {
      api.post(_makeOptions(options, path(), data), callback);
    },
    list: function(callback) {
      api.get(_makeOptions(options, path()), callback);
    },
    retrieve: function(resourceId, callback) {
      if (typeof(resourceId) === 'function') { //ugly hack
        callback = resourceId;
        resourceId = null;
      }
      api.get(_makeOptions(options, path(resourceId)), callback);
    },
    destroy: function(resourceId, callback) {
      api.destroy(_makeOptions(options, path(resourceId)), callback);
    },
    update: function(resourceId, data, callback) {
      api.update(_makeOptions(options, path(resourceId), data), callback);
    },

    //Charge
    capture: function(resourceId, callback) {
      api.post(_nestedPathOptions(options, path(resourceId), 'capture'),
               callback);
    },

    //Card
    listCards: function(resourceId, callback) {
      api.get(_nestedPathOptions(options, path(resourceId), 'cards'), callback);
    },
    retrieveCard: function(resourceId, cardId, callback) {
      api.get(
        _nestedPathOptions(options, path(resourceId), 'cards', cardId),
        callback
      );
    },
    destroyCard: function(resourceId, cardId, callback) {
      api.destroy(
        _nestedPathOptions(options, path(resourceId), 'cards', cardId),
        callback);
    },
    updateCard: function(resourceId, cardId, data, callback) {
      api.update(
        _nestedPathOptions(options, path(resourceId), 'cards', cardId, data),
        callback);
    },

    //Refund
    createRefund: function(resourceId, data, callback) {
      api.post(_nestedPathOptions(options, path(resourceId), 'refunds', data),
               callback);
    },
    listRefunds: function(resourceId, callback) {
      api.get(_nestedPathOptions(options, path(resourceId), 'refunds'),
              callback);
    },
    retrieveRefund: function(resourceId, refundId, callback) {
      api.get(
        _nestedPathOptions(options, path(resourceId), 'refunds', refundId),
        callback
      );
    }
  }, actions);
}

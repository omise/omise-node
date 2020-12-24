'use strict';
var api = require('./api');
var _ = require('lodash');
var omiseConfig;

function resourceName(name) {
  return require(['./resources/', name].join(''))(omiseConfig);
}

function resourcePath(name) {
  var path = name;
  if (name['0'] !== '/') {
    path = ['/', name].join('');
  }
  return function (resourceId) {
    return { 'path': _.compact([path, resourceId]).join('/') };
  };
}

function nestedPath(resource, nestedName, nestedId) {
  return resourcePath(
    resourcePath(resource['path'])(nestedName)['path']
  )(nestedId);
}

function _nestedPathOptions(opts, pathObj, resource, id, data) {
  if (typeof (id) === 'object') {
    data = [id, id = data][0];
  }
  return _makeOptions(opts, nestedPath(pathObj, resource, id), data);
}

function _makeOptions(options, path, data) {
  return _.merge({}, options, path, { body: data });
}

module.exports.omiseResources = function (config) {
  omiseConfig = config;
  return {
    sources: resourceName('Source'),
    tokens: resourceName('Token'),
    customers: resourceName('Customer'),
    charges: resourceName('Charge'),
    schedules: resourceName('Schedule'),
    disputes: resourceName('Dispute'),
    transfers: resourceName('Transfer'),
    transactions: resourceName('Transaction'),
    recipients: resourceName('Recipient'),
    events: resourceName('Event'),
    links: resourceName('Link'),
    account: resourceName('Account'),
    balance: resourceName('Balance'),
    search: resourceName('Search'),
    capability: resourceName('Capability'),
  };
};

module.exports.resourceActions = function (name, actions, options) {
  var path = resourcePath(name);
  return _.pick({
    create: function (data, callback) {
      return api.post(_makeOptions(options, path(), data), callback);
    },
    list: function (data, callback) {
      if (typeof (data) === 'function') {
        callback = data; data = null;
      }
      return api.get(_makeOptions(options, path(), data), callback);
    },
    retrieve: function (resourceId, callback) {
      if (typeof (resourceId) === 'function') { // ugly hack
        callback = resourceId;
        resourceId = null;
      }
      return api.get(_makeOptions(options, path(resourceId)), callback);
    },
    destroy: function (resourceId, callback) {
      return api.destroy(_makeOptions(options, path(resourceId)), callback);
    },
    update: function (resourceId, data, callback) {
      return api.update(_makeOptions(options, path(resourceId), data),
        callback);
    },

    // account
    updateAccount: function (data, callback) {
      return api.update(_makeOptions(options, path(), data),
        callback);
    },

    schedules: function (resourceId, data, callback) {
      if (resourceId && typeof (data) === 'function') {
        callback = data; data = null;
      } else if (typeof (resourceId) === 'function') {
        callback = resourceId;
        resourceId = null;
      }
      if (resourceId) {
        var pathOptions = _nestedPathOptions(
          options,
          path(resourceId),
          'schedules',
          data);
        return api.get(pathOptions, callback);
      } else {
        return api.get(_makeOptions(options, path('schedules'), data), callback);
      }
    },

    // Charge
    capture: function (resourceId, callback) {
      return api.post(_nestedPathOptions(options, path(resourceId), 'capture'),
        callback);
    },
    reverse: function (resourceId, callback) {
      return api.post(_nestedPathOptions(options, path(resourceId), 'reverse'),
        callback);
    },
    expire: function (resourceId, callback) {
      return api.post(_nestedPathOptions(options, path(resourceId), 'expire'),
        callback);
    },

    // Card
    listCards: function (resourceId, data, callback) {
      if (typeof (data) === 'function') {
        callback = data; data = null;
      }
      return api.get(_nestedPathOptions(options, path(resourceId), 'cards',
        data), callback);
    },
    retrieveCard: function (resourceId, cardId, callback) {
      return api.get(
        _nestedPathOptions(options, path(resourceId), 'cards', cardId),
        callback
      );
    },
    destroyCard: function (resourceId, cardId, callback) {
      return api.destroy(
        _nestedPathOptions(options, path(resourceId), 'cards', cardId),
        callback);
    },
    updateCard: function (resourceId, cardId, data, callback) {
      return api.update(
        _nestedPathOptions(options, path(resourceId), 'cards', cardId, data),
        callback);
    },

    // Refund
    createRefund: function (resourceId, data, callback) {
      return api.post(_nestedPathOptions(options, path(resourceId), 'refunds',
        data),
        callback);
    },
    listRefunds: function (resourceId, callback) {
      return api.get(_nestedPathOptions(options, path(resourceId), 'refunds'),
        callback);
    },
    retrieveRefund: function (resourceId, refundId, callback) {
      return api.get(
        _nestedPathOptions(options, path(resourceId), 'refunds', refundId),
        callback
      );
    },

    // Dispute
    listOpen: function (callback) {
      return api.get(_makeOptions(options, path('open')), callback);
    },
    listClosed: function (callback) {
      return api.get(_makeOptions(options, path('closed')), callback);
    },
    listPending: function (callback) {
      return api.get(_makeOptions(options, path('pending')), callback);
    },

  }, actions);
};

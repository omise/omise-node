'use strict';
var _ = require('lodash');
var api = require('../api');

var customers = function(config) {
  var options  = { 'key' : config['secretKey'] };
  var path = require('../apiResources').resourcePath('/customers')
  return {
          /**
           * @param  {Object}
           * See more details
           * in https://docs.omise.co/api/customers/#create-a-customer
           * @callback The callback that handles a customer object response.
          */
          create: function(data, callback) {
            api.post(_.merge(path(),_.merge({'data': data}, options)), callback);
          },
          /**
           * @callback The callback that handles customers response.
           */
          list: function(callback) {
            api.get(_.merge(path(), options), callback);
          },
          /**
           * @param {String} The id of the customer to be retrieved.
           * @callback the callback will handle a customer object response.
           */
          retrieve: function(customerId, callback) {
            api.get(_.merge(path(customerId), options), callback);
          },
          /**
           * @param {String} The id of the customer to be deleted.
           * @callback the callback will handle a customer object response.
           */
          destroy: function(customerId, callback) {
            api.destroy(_.merge(path(customerId), options), callback);
          },
          /**
           * @param {String} The id of the customer to be updated.
           * @callback the callback will handle a customer object response.
           */
          update: function(customerId, data, callback) {
            api.update(_.merge(path(customerId),_.merge({'data': data}, options)), callback);
          }
    };
}

module.exports = customers;

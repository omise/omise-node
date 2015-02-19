'use strict';
var api = require('../api');
var customersPath = '/customers';
var customers = function(config) {
  return {
          /**
           * @param  {Object}
           * See more details
           * in https://docs.omise.co/api/customers/#create-a-customer
           * @callback The callback that handles a customer object response.
          */
          create: function(data, callback) {
            api.post({'path': customersPath,
                      'data': data,
                      'key' : config['secretKey']
            }, callback);
          },
          /**
           * @callback The callback that handles customers response.
           */
          list: function(callback) {
            api.get({'path': customersPath,
                     'key': config['secretKey']
            }, callback);
          },
          /**
           * @param {String} The id of the customer to be retrieved.
           * @callback the callback will handle a customer object response.
           */
          retrieve: function(customerId, callback) {
            api.get({'path': [customersPath, customerId].join('/'),
                     'key': config['secretKey']
                  }, callback);
          },
          /**
           * @param {String} The id of the customer to be deleted.
           * @callback the callback will handle a customer object response.
           */
          destroy: function(customerId, callback) {
            api.destroy({'path': [customersPath, customerId].join('/'),
                        'key': config['secretKey']
                        }, callback);
          },
          /**
           * @param {String} The id of the customer to be updated.
           * @callback the callback will handle a customer object response.
           */
          update: function(customerId, data, callback) {
            api.update({'path': [customersPath, customerId].join('/'),
                        'data': data,
                        'key': config['secretKey']
                        }, callback);
          }
    };
}

module.exports = customers;
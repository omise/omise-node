//Omise.co
var api = require('./lib/api.js');

//paths
var customersPath = '/customers';
var tokensPath = '/tokens';

module.exports = function(config) {
  return {
    tokens: {
      /**
       * @param  {Object}
       * See more details in https://docs.omise.co/api/tokens/#create-a-token
       * @callback The callback that handles a token response.
       */
      create: function(data, callback) {
        api.post({'host': 'vault.omise.co',
                  'path': tokensPath,
                  'data': data,
                  'key': config['publicKey']
        }, callback);
      },
    },
    customers: {
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
      }
    }
  };
};

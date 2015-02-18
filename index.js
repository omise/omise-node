//Omise.co
var api = require('./lib/api.js');

module.exports = function(config) {
  return {
    tokens: {
      /**
       * @param  {Object} See more details in https://docs.omise.co/api/tokens/#create-a-token
       * @callback The callback that handles the response.
       */
      create: function(data, callback) {
        api.post({'host': 'vault.omise.co',
                  'path': '/tokens',
                  'data': data,
                  'key': config['publicKey']
        }, callback);
      },
    },
    customers: {
       /**
       * @param  {Object} See more details in https://docs.omise.co/api/customers/#create-a-customer
       * @callback The callback that handles the response.
       */
      create: function(data, callback) {
        api.post({'path': '/customers',
                  'data': data,
                  'key' : config['secretKey']
        }, callback);
      }
    }
  };
};

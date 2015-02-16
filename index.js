//Omise.co
var api = require('./lib/api.js');

module.exports = function(config) {
  return {
    tokens: {
      create: function(data, callback) {
        api.post({'host': 'vault.omise.co',
                  'path': '/tokens',
                  'data': data,
                  'key': config['publicKey']
        }, callback);
      },
    },
    customers: {
      create: function(data, callback) {
        api.post({'path': '/customers',
                  'data': data,
                  'key' : config['secretKey']
        }, callback);
      }
    }
  };
};

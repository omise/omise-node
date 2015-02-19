'use strict';
var api = require('../api');
var tokensPath = '/tokens';
var tokens = function(config) {
  return {
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
  };
}

module.exports = tokens;
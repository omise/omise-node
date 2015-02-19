'use strict';
var _ = require('lodash');
var api = require('../api');

var tokens = function(config) {
  var options  = {'host': 'vault.omise.co', 'key': config['publicKey']};
  var path = require('../apiResources').resourcePath('/tokens')
  return {
              /**
               * @param  {Object}
               * See more details in https://docs.omise.co/api/tokens/#create-a-token
               * @callback The callback that handles a token response.
               */
              create: function(data, callback) {
                api.post(_.merge(path(),_.merge({'data': data}, options)), callback);
              },
  };
}

module.exports = tokens;
'use strict';
var _ = require('lodash');
var api = require('../api');

var charges = function(config) {
  var options  = {'host': 'api.omise.co', 'key': config['secretKey']};
  var path = require('../apiResources').resourcePath('/charges')
  return {
              /**
               * @param  {Object}
               * See more details in https://docs.omise.co/api/charges/#create-a-charge
               * @callback The callback that handles a charge response.
               */
              create: function(data, callback) {
                api.post(_.merge(path(),_.merge({'data': data}, options)), callback);
              },
  };
}

module.exports = charges;

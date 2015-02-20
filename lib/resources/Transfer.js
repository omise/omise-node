'use strict';
var resource = require('../apiResources');

var transfers  = function(config) {
  return resource.resourceActions('transfers',
    ['create'],
    {'key': config['secretKey']}
  );
}

module.exports = transfers;

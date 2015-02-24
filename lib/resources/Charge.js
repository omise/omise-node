'use strict';
var resource = require('../apiResources');

var charges = function(config) {
  return resource.resourceActions('charges',
    ['create', 'list', 'retrieve', 'update',
      'capture', 'createRefund'], {'key': config['secretKey']}
  );
}

module.exports = charges;

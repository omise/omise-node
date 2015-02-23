'use strict';
var resource = require('../apiResources');

var charges = function(config) {
  return resource.resourceActions('charges',
    ['create', 'list', 'retrieve'], {'key': config['secretKey']}
  );
}

module.exports = charges;

'use strict';
var resource = require('../apiResources');

var charges = function(config) {
  return resource.resourceActions('charges',
    ['create', 'list', 'retrieve', 'update',
      'capture', 'reverse', 'createRefund', 'listRefunds', 'retrieveRefund'],
      {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
}

module.exports = charges;

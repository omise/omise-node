'use strict';
var resource = require('../apiResources');

var transfers  = function(config) {
  return resource.resourceActions('transfers',
    ['create', 'retrieve', 'update', 'list', 'destroy'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
}

module.exports = transfers;

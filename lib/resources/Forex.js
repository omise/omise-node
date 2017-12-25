'use strict';
var resource = require('../apiResources');

var forex = function(config) {
  return resource.resourceActions('forex',
    ['retrieve'], {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
}

module.exports = forex;

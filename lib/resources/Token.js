'use strict';
var resource = require('../apiResources');

var tokens = function(config) {
  return resource.resourceActions('tokens',
    ['create'], {'key': config['publicKey'], 'host': 'vault.omise.co'}
  );
}

module.exports = tokens;

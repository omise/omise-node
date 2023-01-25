'use strict';

var resource = require('../apiResources');

var tokens = function(config) {
  return resource.resourceActions('tokens',
    ['create', 'retrieve'],
    {
      ...config, 
      key: config['publicKey'], 
      host: config['vaultHost'] || 'vault.omise.co'
    }
  );
};

module.exports = tokens;

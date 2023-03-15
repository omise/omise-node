'use strict';

const resource = require('../apiResources');

const tokens = function(config) {
  return resource.resourceActions('tokens',
    ['create', 'retrieve'],
    {
      ...config,
      key:  config['publicKey'],
      host: config['vaultHost'] || 'vault.omise.co',
    }
  );
};

module.exports = tokens;

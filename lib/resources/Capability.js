'use strict';

const resource = require('../apiResources');

const capability = function(config) {
  return resource.resourceActions('capability',
    ['retrieve'],
    {...config, key: config['publicKey']}
  );
};

module.exports = capability;

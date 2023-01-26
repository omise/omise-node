'use strict';

var resource = require('../apiResources');

var capability = function(config) {
  return resource.resourceActions('capability',
    ['retrieve'],
    {...config, key: config['publicKey']}
  );
};

module.exports = capability;

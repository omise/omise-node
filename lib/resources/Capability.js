'use strict';

var resource = require('../apiResources');

var capability = function(config) {
  return resource.resourceActions('capability',
    ['retrieve'],
    {
      'host': config['host'],
      'key': config['publicKey'],
      'omiseVersion': config['omiseVersion'],
    }
  );
};

module.exports = capability;

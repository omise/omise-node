'use strict';

var resource = require('../apiResources');

var sources = function(config) {
  return resource.resourceActions('sources',
    ['create'],
    {
      'key':          config['publicKey'],
      'omiseVersion': config['omiseVersion'],
      'host':         config['customApiHost'],
    }
  );
};

module.exports = sources;

'use strict';

var resource = require('../apiResources');

var sources = function(config) {
  return resource.resourceActions('sources',
    ['create', 'retrieve'],
    {
      'host': config['host'],
      'key': config['publicKey'], 
      'omiseVersion': config['omiseVersion']
    }
  );
};

module.exports = sources;

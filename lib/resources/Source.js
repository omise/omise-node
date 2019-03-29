'use strict';

var resource = require('../apiResources');

var sources = function(config) {
  return resource.resourceActions('sources',
    ['create', 'retrieve'],
    {'key': config['publicKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = sources;

'use strict';

var resource = require('../apiResources');

var sources = function(config) {
  return resource.resourceActions('sources',
    ['retrieve', 'create'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = sources;

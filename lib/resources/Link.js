'use strict';

var resource = require('../apiResources');

var links = function(config) {
  return resource.resourceActions('links',
    ['list', 'create', 'retrieve'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = links;

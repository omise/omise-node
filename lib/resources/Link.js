'use strict';

var resource = require('../apiResources');

var links = function(config) {
  return resource.resourceActions('links',
    ['list', 'create', 'retrieve'],
    {...config, key: config['secretKey']}
  );
};

module.exports = links;

'use strict';

const resource = require('../apiResources');

const links = function(config) {
  return resource.resourceActions('links',
    ['list', 'create', 'retrieve'],
    {...config, key: config['secretKey']}
  );
};

module.exports = links;

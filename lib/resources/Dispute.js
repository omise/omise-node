'use strict';

const resource = require('../apiResources');

const disputes = function(config) {
  return resource.resourceActions('disputes',
    ['list', 'retrieve', 'update',
      'listOpen', 'listPending', 'listClosed'],
    {...config, key: config['secretKey']}
  );
};

module.exports = disputes;

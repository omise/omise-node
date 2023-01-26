'use strict';

var resource = require('../apiResources');

var disputes = function(config) {
  return resource.resourceActions('disputes',
    ['list', 'retrieve', 'update',
      'listOpen', 'listPending', 'listClosed'],
    {...config, key: config['secretKey']}
  );
};

module.exports = disputes;

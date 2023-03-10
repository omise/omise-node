'use strict';

const resource = require('../apiResources');

const charges = function(config) {
  return resource.resourceActions('charges',
    [
      'create', 'list', 'retrieve', 'update',
      'capture', 'reverse', 'expire', 'createRefund',
      'listRefunds', 'retrieveRefund', 'schedules',
    ],
    {...config, key: config['secretKey']}
  );
};

module.exports = charges;

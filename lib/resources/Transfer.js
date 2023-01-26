'use strict';

var resource = require('../apiResources');

var transfers = function(config) {
  return resource.resourceActions('transfers',
    ['create', 'retrieve', 'update', 'list', 'destroy', 'schedules'],
    {...config, key: config['secretKey']}
  );
};

module.exports = transfers;

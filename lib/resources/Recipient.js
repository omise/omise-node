'use strict';

var resource = require('../apiResources');

var recipients = function(config) {
  return resource.resourceActions('recipients',
    ['list', 'create', 'update', 'retrieve', 'destroy', 'schedules'],
    {...config, key: config['secretKey']}
  );
};

module.exports = recipients;

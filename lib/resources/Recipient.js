'use strict';

const resource = require('../apiResources');

const recipients = function(config) {
  return resource.resourceActions('recipients',
    ['list', 'create', 'update', 'retrieve', 'destroy', 'schedules'],
    {...config, key: config['secretKey']}
  );
};

module.exports = recipients;

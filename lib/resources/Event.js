'use strict';

const resource = require('../apiResources');

const events = function(config) {
  return resource.resourceActions('events',
    ['list', 'retrieve'],
    {...config, key: config['secretKey']}
  );
};

module.exports = events;

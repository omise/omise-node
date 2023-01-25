'use strict';

var resource = require('../apiResources');

var events = function(config) {
  return resource.resourceActions('events',
    ['list', 'retrieve'],
    {...config, key: config['secretKey']}
  );
};

module.exports = events;

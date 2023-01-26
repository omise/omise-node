'use strict';

var resource = require('../apiResources');

var schedules = function(config) {
  return resource.resourceActions('schedules',
    ['retrieve', 'create', 'destroy'],
    {...config, key: config['secretKey']}
  );
};

module.exports = schedules;

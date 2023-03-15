'use strict';

const resource = require('../apiResources');

const schedules = function(config) {
  return resource.resourceActions('schedules',
    ['retrieve', 'create', 'destroy'],
    {...config, key: config['secretKey']}
  );
};

module.exports = schedules;

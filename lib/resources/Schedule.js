'use strict';

var resource = require('../apiResources');

var schedules = function(config) {
  return resource.resourceActions('schedules',
    ['retrieve', 'create', 'destroy'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = schedules;

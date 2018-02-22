'use strict';

var resource = require('../apiResources');

var schedules = function(config) {
  return resource.resourceActions('schedules',
    ['create', 'list', 'retrieve', 'destroy'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = schedules;

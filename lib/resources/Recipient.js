'use strict';

var resource = require('../apiResources');

var recipients = function(config) {
  return resource.resourceActions('recipients',
    ['list', 'create', 'update', 'retrieve', 'destroy', 'schedules'],
    {
      'host': config['host'],
      'key': config['secretKey'], 
      'omiseVersion': config['omiseVersion']
    }
  );
};

module.exports = recipients;

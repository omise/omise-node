'use strict';

var resource = require('../apiResources');

var events = function(config) {
  return resource.resourceActions('events',
    ['list', 'retrieve'],
    {
      'host': config['host'],
      'key': config['secretKey'], 
      'omiseVersion': config['omiseVersion']
    }
  );
};

module.exports = events;

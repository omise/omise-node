'use strict';

var resource = require('../apiResources');

var events = function(config) {
  return resource.resourceActions('events',
    ['list', 'retrieve'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = events;

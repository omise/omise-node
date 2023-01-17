'use strict';

var resource = require('../apiResources');

var searches = function(config) {
  return resource.resourceActions('search', ['list'],
    {
      'host': config['host'],
      'key': config['secretKey'], 
      'omiseVersion': config['omiseVersion']
    }
  );
};

module.exports = searches;

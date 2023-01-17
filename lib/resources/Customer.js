'use strict';

var resource = require('../apiResources');

var customers = function(config) {
  return resource.resourceActions('customers',
    ['create', 'list', 'retrieve', 'destroy', 'update',
      'listCards', 'retrieveCard', 'updateCard', 'destroyCard', 'schedules'],
    {
      'host': config['host'],
      'key': config['secretKey'], 
      'omiseVersion': config['omiseVersion']
    }
  );
};

module.exports = customers;

'use strict';

const resource = require('../apiResources');

const customers = function(config) {
  return resource.resourceActions('customers',
    ['create', 'list', 'retrieve', 'destroy', 'update',
      'listCards', 'retrieveCard', 'updateCard', 'destroyCard', 'schedules'],
    {...config, key: config['secretKey']}
  );
};

module.exports = customers;

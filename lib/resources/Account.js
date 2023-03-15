'use strict';

const resource = require('../apiResources');

const account = function(config) {
  return resource.resourceActions('account',
    ['retrieve', 'updateAccount'],
    {...config, key: config['secretKey']}
  );
};

module.exports = account;

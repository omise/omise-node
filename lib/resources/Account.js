'use strict';

var resource = require('../apiResources');

var account = function (config) {
  return resource.resourceActions('account',
    ['retrieve', 'updateAccount'],
    {...config, key: config['secretKey']}
  );
};

module.exports = account;

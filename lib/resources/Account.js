'use strict';

var resource = require('../apiResources');

var account = function (config) {
  return resource.resourceActions('account',
    ['retrieve', 'updateAccount'],
    {
      'key': config['secretKey'],
      'omiseVersion': config['omiseVersion'],
    }
  );
};

module.exports = account;

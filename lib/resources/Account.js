'use strict';

var resource = require('../apiResources');

var account = function(config) {
  return resource.resourceActions('account',
    ['retrieve', 'update'],
    {
      'key':          config['secretKey'],
      'omiseVersion': config['omiseVersion'],
    }
  );
};

module.exports = account;

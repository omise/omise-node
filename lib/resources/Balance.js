'use strict';

var resource = require('../apiResources');

var balance = function(config) {
  return resource.resourceActions('balance',
    ['retrieve'],
    {
      'key':          config['secretKey'],
      'omiseVersion': config['omiseVersion'],
    }
  );
};

module.exports = balance;

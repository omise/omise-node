'use strict';

var resource = require('../apiResources');

var balance = function(config) {
  return resource.resourceActions('balance',
    ['retrieve'],
    {
      'host': config['host'],
      'key': config['secretKey'],
      'omiseVersion': config['omiseVersion'],
    }
  );
};

module.exports = balance;

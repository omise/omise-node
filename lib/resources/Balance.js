'use strict';

const resource = require('../apiResources');

const balance = function(config) {
  return resource.resourceActions('balance',
    ['retrieve'],
    {...config, key: config['secretKey']}
  );
};

module.exports = balance;

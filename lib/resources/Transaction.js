'use strict';

const resource = require('../apiResources');

const transactions = function(config) {
  return resource.resourceActions('transactions', ['list', 'retrieve'],
    {...config, key: config['secretKey']}
  );
};

module.exports = transactions;

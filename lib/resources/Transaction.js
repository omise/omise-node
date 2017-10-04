'use strict';

var resource = require('../apiResources');

var transactions = function(config) {
  return resource.resourceActions('transactions', ['list', 'retrieve'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = transactions;

'use strict';
var resource = require('../apiResources');

var transactions  = function(config) {
  return resource.resourceActions('transactions', ['list', 'retrieve'],
    {'key': config['secretKey']}
  );
}

module.exports = transactions;

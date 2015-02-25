'use strict';
var resource = require('../apiResources');

var account = function(config) {
  return resource.resourceActions('account',
    ['retrieve'], {'key': config['secretKey']}
  );
}

module.exports = account;

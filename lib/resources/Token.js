'use strict';
var resource = require('../apiResources');

var tokens = function(config) {
  return resource.resourceActions('tokens',
    ['create'], {'key': config['publicKey']}
  );
}

module.exports = tokens;
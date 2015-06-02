'use strict';
var resource = require('../apiResources');

var recipients  = function(config) {
  return resource.resourceActions('recipients',
    ['list', 'create'],
    {'key': config['secretKey']}
  );
}

module.exports = recipients;

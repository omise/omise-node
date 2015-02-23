'use strict';
var resource = require('../apiResources');

var cards  = function(config) {
  return resource.resourceActions('cards',
    ['list'],
    {'key': config['secretKey']}
  );
}

module.exports = cards;

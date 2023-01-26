'use strict';

var resource = require('../apiResources');

var searches = function(config) {
  return resource.resourceActions('search', ['list'],
    {...config, key: config['secretKey']}
  );
};

module.exports = searches;

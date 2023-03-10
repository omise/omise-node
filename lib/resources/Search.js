'use strict';

const resource = require('../apiResources');

const searches = function(config) {
  return resource.resourceActions('search', ['list'],
    {...config, key: config['secretKey']}
  );
};

module.exports = searches;

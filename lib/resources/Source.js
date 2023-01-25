'use strict';

var resource = require('../apiResources');

var sources = function(config) {
  return resource.resourceActions('sources',
    ['create', 'retrieve'],
    {...config, key: config['publicKey']}
  );
};

module.exports = sources;

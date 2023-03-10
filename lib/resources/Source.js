'use strict';

const resource = require('../apiResources');

const sources = function(config) {
  return resource.resourceActions('sources',
    ['create', 'retrieve'],
    {...config, key: config['publicKey']}
  );
};

module.exports = sources;

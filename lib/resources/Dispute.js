'use strict';

var resource = require('../apiResources');

var disputes = function(config) {
  return resource.resourceActions('disputes',
    ['list', 'retrieve', 'update',
      'listOpen', 'listPending', 'listClosed'],
    {'key': config['secretKey'], 'omiseVersion': config['omiseVersion']}
  );
};

module.exports = disputes;

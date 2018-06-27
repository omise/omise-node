'use strict';

module.exports = {
  setupMock: function(name) {
    if (process.env.NOCK_OFF !== 'true') {
      require(['./mocks', name].join('/'));
    }
  },
  clean: function() {
    if (process.env.NOCK_OFF !== 'true') {
      var nock = require('nock');
      nock.cleanAll();
    }
  },
};

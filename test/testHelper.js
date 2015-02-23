'use strict';

var testHelper = module.exports = {
  setupMock: function(name) {
    if (process.env.NOCK_OFF !== 'true') {
      require(['./mocks', name].join('/'));
    }
  }
};

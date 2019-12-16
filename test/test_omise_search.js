var chai = require('chai');
var expect = chai.expect;
var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Search', function() {
    it('should be able to search a transfer scope', function(done) {
      testHelper.setupMock('search_transfer');
      var data = {'scope': 'transfer'};
      omise.search.list(data, function(err, resp) {
        expect(resp.object, 'search');
        expect(resp.scope, 'transfer');
        done(err);
      });
    });
  });
});

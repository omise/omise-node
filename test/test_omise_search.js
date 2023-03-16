const {assert} = require('chai');
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Search', function() {
    it('should be able to search a transfer scope', function(done) {
      testHelper.setupMock('search_transfer');
      const data = {'scope': 'transfer'};
      omise.search.list(data, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'search');
        assert.equal(resp.scope, 'transfer');
        done();
      });
    });
  });
});

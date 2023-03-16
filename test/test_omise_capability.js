const {expect} = require('chai');
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Capabilities', function() {
    it('should be able to retrieve information about capabilities',
      function(done) {
        testHelper.setupMock('capability_retrieve');
        omise.capability.retrieve(function(err, resp) {
          if (err) done(err);
          expect(resp.object, 'capability');
          expect(resp.banks).to.be.an('array');
          expect(resp.zero_interest_installments).to.be.a('boolean');
          done();
        });
      });
  });
});

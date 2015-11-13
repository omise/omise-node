var chai   = require('chai');
var expect = chai.expect;
var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Balance', function() {
    it('should be able to retrieve a balance', function(done) {
      testHelper.setupMock('balance_retrieve');
      omise.balance.retrieve(function(err, resp) {
        expect(resp.object, 'balance');
        expect(resp.available).not.be.nil;
        expect(resp.total).not.be.nil;
        expect(resp.currency, 'thb');
        done();
      });
    });
  })
})

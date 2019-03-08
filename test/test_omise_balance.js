var chai   = require('chai');
var expect = chai.expect;
var config = require('./config');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');
var nock = require('nock');

describe('Omise', function() {
  describe('#Balance', function() {
    it('should not raise exception connection to Omise is failed', function(done) {
      nock('"https://api.omise.co')
        .get('/balance')
        .reply(1001, 'DNS resolution error');
      try {
        omise.balance.retrieve(function(err) {
          if (err) {
            done();
          } else {
            done('Server is wrecked');
          }
        });
      } catch (err) {
        done(err);
      }
    });

    it('should be able to retrieve a balance', function(done) {
      testHelper.setupMock('balance_retrieve');
      omise.balance.retrieve(function(err, resp) {
        expect(resp.object, 'balance');
        expect(resp.available).not.be.nil;
        expect(resp.total).not.be.nil;
        expect(resp.currency, 'thb');
        done(err);
      });
    });
  });
});

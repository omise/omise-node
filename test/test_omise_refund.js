var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#refund', function() {
    it('should be able to create a refund', function(done) {
      testHelper.setupMock('refunds_create');
      var chargeId = 'chrg_test_4z4295deewwyaviw003';
      var data = {'amount': 100000};
      omise.charges.createRefund(chargeId, data, function(err, resp) {
        expect(resp.id).to.contains('rfnd_test_4z5xxgntg3pzhhynae4');
        expect(resp.object, 'refund');
        expect(resp.amount, 100000);
        expect(resp.currency, 'thb');
        done();
      });
    });

    it('should be able to list refunds', function(done) {
      testHelper.setupMock('refunds_list');
      var chargeId = 'chrg_test_4z4295deewwyaviw003';
      omise.charges.listRefunds(chargeId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'refund');
        done();
      });
    });
  })
})

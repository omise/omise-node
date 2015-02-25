var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#cards', function() {
    it('should be able to list all cards', function(done) {
      testHelper.setupMock('cards_list');
      var customerId = 'cust_test_4z2owmajzsb3c527wj7';
      omise.customers.listCards(customerId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'card');
      });
      done();
    });
  })
})

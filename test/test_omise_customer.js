var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);

describe('Omise', function() {
  before(function() {
    if (process.env.NOCK_OFF !== 'true') {
      require('./mocks/customers_create');
    }
  });

  describe('#customers', function() {
    it('should be able to create customer', function(done) {
      var data = {
        email: "john.doe@example.com",
        description: "John Doe (id: 30)",
        card: "tokn_test_4xs9408a642a1htto8z"
      };
      omise.customers.create(data, function(err, resp) {
        var customer_id = resp.id;
        expect(customer_id).to.contains('cust_test');
        var obj = resp.object;
        obj.should.equal('customer');
        var email = resp.email;
        email.should.equal("john.doe@example.com");
        done();
      });
    })
  })
})

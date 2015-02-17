var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);

describe('Omise', function() {
  describe('#customers', function() {
    it('should be able to create customer', function(done) {
      if (process.env.NOCK_OFF !== 'true') {
        require('./mocks/customers_create');
      }
      var data = {
        email: 'john.doe@example.com',
        description: 'John Doe (id: 30)',
        card: 'tokn_test_4xs9408a642a1htto8z'
      };
      omise.customers.create(data, function(err, resp) {
        var customerId = resp.id;
        expect(customerId).to.contains('cust_test');
        var obj = resp.object;
        obj.should.equal('customer');
        var email = resp.email;
        email.should.equal('john.doe@example.com');
        done();
      });
    });

    it('should be able to list all customers', function(done) {
      if (process.env.NOCK_OFF !== 'true') {
        require('./mocks/customers_list');
      }
      omise.customers.list(function(err, resp) {
        expect(resp.object, 'customer');
      });
      done();
    });

    it('should be able to retrieve an existing customer', function(done) {
      if (process.env.NOCK_OFF !== 'true') {
        require('./mocks/customer_retrieve');
        var customerId = 'cust_test_4z33o46lqreryhqua8w';
        omise.customers.retrieve(customerId, function(err, resp) {
          expect(resp.object, 'list');
          expect(resp.data).to.be.instanceof(Array);
        });
      }
      done();
    });

  })
})

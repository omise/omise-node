var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#customers', function() {
    it('should be able to create customer', function(done) {
      testHelper.setupMock('customers_create');
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
      testHelper.setupMock('customers_list');
      omise.customers.list(function(err, resp) {
        expect(resp.object, 'customer');
      });
      done();
    });

    it('should be able to retrieve an existing customer', function(done) {
      testHelper.setupMock('customer_retrieve');
      var customerId = 'cust_test_4z33o46lqreryhqua8w';
      omise.customers.retrieve(customerId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
      });
      done();
    });

    it('should be able to destroy an existing customer', function(done) {
      testHelper.setupMock('customer_delete');
      var customerId = 'cust_test_4yygdeiu4ko863sxts9';
      omise.customers.destroy(customerId, function(err, resp) {
        expect(resp.object, 'customer');
        expect(resp.deleted).to.be.true;
      });
      done();
    });

    it('should be able to update an existing customer', function(done) {
      testHelper.setupMock('customer_update');
      var customerId = 'cust_test_4z2owmajzsb3c527wj7';
      omise.customers.update(customerId, function(err, resp) {
        expect(resp.object, 'customer');
        expect(resp.description, 'New description');
      });
      done();
    });
  })
})

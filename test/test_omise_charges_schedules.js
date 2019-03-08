'use strict';
var chai = require('chai');
var expect = chai.expect;

var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Charge Schedules', function() {
    var chargeScheduleId = 'schd_test_5aikygh29nc6u68xuib';
    var customerId = 'cust_test_5a4j05pd5uuk0y6y6ls';
    var amount = 200000;

    it('should be able to create a charge schedule', function(done) {
      testHelper.setupMock('charge_schedules_create');
      omise.schedules.create({
        'every':  '1',
        'period': 'month',
        'on':     {
          'days_of_month': [
            '1',
          ],
        },
        'start_date': '2018-01-04',
        'end_date':   '2019-01-04',
        'charge':     {
          'customer':    customerId,
          'amount':      amount,
          'description': 'schedule charge id:1',
        },
      }, function(err, resp) {
        expect(resp.object, 'schedule');
        expect(resp).to.have.property('charge');
        expect(resp.charge).to.have.property('amount');
        resp.charge.amount.should.equal(amount);
        done(err);
      });
    });

    it('should be able to list all charge schedules', function(done) {
      testHelper.setupMock('charge_schedules_list');
      omise.charges.schedules(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'schedule');
        expect(resp.data[0]).to.include.keys('charge');
        expect(resp.data[0].charge).not.be.nil;
        resp.data[0].id.should.equal(chargeScheduleId);
        resp.data[0].charge.customer.should.equal(customerId);
        done(err);
      });
    });

    it('should be able to retrieve a charge schedule', function(done) {
      testHelper.setupMock('charge_schedules_retrieve');
      omise.schedules.retrieve(chargeScheduleId, function(err, resp) {
        expect(resp.object, 'schedule');
        expect(resp).to.have.property('charge');
        expect(resp.charge).to.have.property('amount');
        resp.charge.amount.should.equal(amount);
        done(err);
      });
    });


    it('should be able to list all charge schedules of customer', function(done) {
      testHelper.setupMock('customer_schedules_list');
      omise.customers.schedules(customerId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'schedule');
        expect(resp.data[0]).to.include.keys('charge');
        expect(resp.data[0].charge).not.be.nil;

        expect(resp.data[0].charge).to.have.property('amount');
        expect(resp.data[0].charge).to.have.property('customer');
        resp.data[0].charge.amount.should.equal(amount);
        resp.data[0].charge.customer.should.equal(customerId);
        done(err);
      });
    });

    it('should be able to destroy a charge schedule', function(done) {
      testHelper.setupMock('charge_schedules_destroy');
      omise.schedules.destroy(chargeScheduleId, function(err, resp) {
        expect(resp.object, 'schedule');
        expect(resp).to.have.property('charge');
        expect(resp).to.have.property('status');
        expect(resp.charge).to.have.property('amount');
        resp.charge.amount.should.equal(amount);
        resp.status.should.equal('deleted');
        done(err);
      });
    });
  });
});

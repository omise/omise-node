'use strict';
var chai = require('chai');
var expect = chai.expect;

var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Transfer Schedules', function() {
    var transferScheduleId = 'schd_test_5cc9ygd384j50oxv2nw';
    var recipientId = 'recp_test_58dw0pqszjc9hlv8gbo';
    var amount = 100000;

    it('should be able to create a transfer schedule', function(done) {
      testHelper.clean();
      testHelper.setupMock('transfers_schedules_create');
      omise.schedules.create({
        'every':  '1',
        'period': 'month',
        'on':     {
          'days_of_month': ['1'],
        },
        'start_date': '2018-01-04',
        'end_date':   '2019-01-04',
        'transfer':   {
          'recipient':   recipientId,
          'amount':      amount,
          'description': 'schedule transfer id:1',
        },
      }, function(err, resp) {
        expect(resp.object, 'schedule');
        expect(resp).to.have.property('transfer');
        expect(resp.transfer).to.have.property('amount');
        resp.transfer.amount.should.equal(amount);
        done(err);
      });
    });

    it('should be able to list all transfer schedules', function(done) {
      testHelper.setupMock('transfers_schedules_list');
      omise.transfers.schedules(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'schedule');
        expect(resp.data[0]).include.keys('transfer');
        expect(resp.data[0].transfer).not.be.nil;
        resp.data[0].id.should.equal(transferScheduleId);
        resp.data[0].transfer.recipient.should.equal(recipientId);
        done(err);
      });
    });

    it('should be able to list all transfer schedules for a given recipient', function(done) {
      testHelper.setupMock('recipients_schedules_list');
      omise.recipients.schedules(recipientId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'schedule');
        expect(resp.data[0]).include.keys('transfer');
        expect(resp.data[0].transfer).not.be.nil;
        resp.data[0].id.should.equal(transferScheduleId);
        resp.data[0].transfer.recipient.should.equal(recipientId);
        done(err);
      });
    });

    it('should be able to retrieve a transfer schedule', function(done) {
      testHelper.setupMock('transfers_schedules_retrieve');
      omise.schedules.retrieve(transferScheduleId, function(err, resp) {
        expect(resp.object, 'schedule');
        expect(resp).to.have.property('transfer');
        expect(resp.transfer).to.have.property('amount');
        resp.transfer.amount.should.equal(amount);
        done(err);
      });
    });

    it('should be able to destroy a transfer schedule', function(done) {
      testHelper.setupMock('transfers_schedules_destroy');
      omise.schedules.destroy(transferScheduleId, function(err, resp) {
        expect(resp.object, 'schedule');
        expect(resp).to.have.property('transfer');
        expect(resp).to.have.property('status');
        expect(resp.transfer).to.have.property('amount');
        resp.transfer.amount.should.equal(amount);
        resp.status.should.equal('deleted');
        done(err);
      });
    });
  });
});

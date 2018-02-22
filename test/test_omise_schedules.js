var chai   = require('chai');
var expect = chai.expect;

var config = require('./config');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Schedules', function() {
    var scheduleID = 'schd_test_57s33hm9fg1pzcqihxs';

    it('should be able to create a charge schedule', function(done) {
      testHelper.setupMock('schedule_create');
      var schedule = {
        'every': 1,
        'period': 'month',
        'on': {
          'days_of_month': [2],
        },
        'status': 'active',
        'start_date': '2017-04-27',
        'end_date': '2018-04-27',
        'charge': {
          'amount': 88800,
          'currency': 'thb',
          'description': 'Monthly membership fee',
          'customer': 'cust_test_55bb3hkywglfyyachha',
          'card': 'card_test_55bb3fhl3tc1wr9d51d',
        },
      };

      omise.schedules.create(schedule, function(err, resp) {
        expect(resp.object, 'schedule');
        done();
      });
    });

    it('should be able to list schedules', function(done) {
      testHelper.setupMock('schedule_list');
      omise.schedules.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        done();
      });
    });

    it('should be able to retrieve a schedule', function(done) {
      testHelper.setupMock('schedule_retrieve');
      omise.schedules.retrieve(scheduleID, function(err, resp) {
        expect(resp.object, 'schedule');
        expect(resp.id, scheduleID);
        done();
      });

      it('should be able to destroy a schedule', function(done) {
        testHelper.setupMock('schedule_destroy');
        omise.schedules.destroy(scheduleID, function(err, resp) {
          expect(resp.object, 'schedule');
          expect(resp.id, scheduleID);
          done();
        });
      });
    });
  });
});

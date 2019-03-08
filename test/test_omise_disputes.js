'use strict';
var chai   = require('chai');
var expect = chai.expect;
var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Disputes', function() {
    it('should be able to list all disputes', function(done) {
      testHelper.setupMock('disputes_list');
      omise.disputes.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        done(err);
      });
    });

    // Because we are not able to create disputes via api
    // So, skip this for remote tests here.
    if (process.env.NOCK_OFF !== 'true') {
      it('should be able to list open disputes', function(done) {
        testHelper.setupMock('disputes_list_open');
        omise.disputes.listOpen(function(err, resp) {
          expect(resp.object, 'list');
          expect(resp.data).to.be.instanceof(Array);
          expect(resp.data[0].status, 'open');
          done(err);
        });
      });

      it('should be able to list closed disputes', function(done) {
        testHelper.setupMock('disputes_list_closed');
        omise.disputes.listClosed(function(err, resp) {
          expect(resp.object, 'list');
          expect(resp.data).to.be.instanceof(Array);
          expect(resp.data[0].status, 'closed');
          done(err);
        });
      });

      it('should be able to list pending disputes', function(done) {
        testHelper.setupMock('disputes_list_pending');
        omise.disputes.listPending(function(err, resp) {
          expect(resp.object, 'list');
          expect(resp.data).to.be.instanceof(Array);
          expect(resp.data[0].status, 'pending');
          done(err);
        });
      });

      it('should be able to retrieve a dispute', function(done) {
        testHelper.setupMock('disputes_list');
        omise.disputes.list(function(err, resp) {
          testHelper.setupMock('disputes_retrieve');
          omise.disputes.retrieve(resp.data[0].id, function(err, resp) {
            expect(resp.message, 'testing dispute');
            expect(resp.charge).to.match(/^chrg_test/);
            done(err);
          });
        });
      });

      it('should be able to update a dispute', function(done) {
        testHelper.setupMock('disputes_list_open');
        omise.disputes.listOpen(function(err, resp) {
          var updateData = {'message': 'Unauthorized transaction'};
          testHelper.setupMock('disputes_update');
          omise.disputes.update(resp.data[0].id, updateData,
            function(err, resp) {
              expect(resp.message, updateData.message);
              expect(resp.charge).to.match(/^chrg_test/);
              done(err);
            });
        });
      });
    }
  });
});

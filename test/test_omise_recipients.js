'use strict';
var chai   = require('chai');
var expect = chai.expect;
var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Recipients', function() {
    it('should be able to create a recipient', function(done) {
      var recipient = {
        'name':         'John Doe',
        'description':  'John Doe (id: 30)',
        'email':        'john.doe@example.com',
        'type':         'individual',
        'tax_id':       1234567890,
        'bank_account': {
          'brand':  'bbl',
          'number': '1234567890',
          'name':   'John Doe',
        },
      };
      testHelper.setupMock('recipients_create');
      omise.recipients.create(recipient, function(err, resp) {
        expect(resp.object, 'recipient');
        expect(resp.type, 'individual');
        expect(resp.type, 1273456789);
        expect(resp).to.include.keys('bank_account');
        expect(resp.bank_account.last_digits, 7890);
        done(err);
      });
    });

    it('should be able to list all recipients', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'recipient');
        expect(resp.data[0]).to.include.keys('type');
        expect(resp.data[0].type).not.be.nil;
        expect(resp.data[0]).to.include.keys('tax_id');
        expect(resp.data[0]).to.include.keys('bank_account');
        done(err);
      });
    });

    it('should be able to update the recipient', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        var recipientId = resp.data[0].id;
        var updateData = {
          'name':   'Di Di',
          'email':  'di@omise.co',
          'tax_id': '9876543210',
        };
        testHelper.setupMock('recipients_update');
        omise.recipients.update(recipientId, updateData, function(err, resp) {
          expect(resp.name, updateData.name);
          expect(resp.email, updateData.email);
          expect(resp.tax_id, updateData.tax_id);
          done(err);
        });
      });
    });

    it('should be able to retrieve the recipient', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        var recipientId = resp.data[0].id;
        testHelper.setupMock('recipients_retrieve');
        omise.recipients.retrieve(recipientId, function(err, resp) {
          expect(resp.id, recipientId);
          done(err);
        });
      });
    });

    it('should be able to destroy the recipient', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        var recipients = resp.data;
        expect(resp.data).to.be.instanceof(Array);
        // atm, the first recipient is always a default, but cannot destroy
        expect(omise.recipients.destroy).instanceof(Function);
        if (recipients.length < 1) {
          done(err);
        }
        var recipientId = recipients[recipients.length - 1].id;
        testHelper.setupMock('recipients_destroy');
        omise.recipients.destroy(recipientId, function(err, resp) {
          expect(resp.id, recipientId);
          expect(resp.deleted, true);
          done(err);
        });
      });
    });
  });
});

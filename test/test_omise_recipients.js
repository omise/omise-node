const {assert, expect} = require('chai');
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Recipients', function() {
    it('should be able to create a recipient', function(done) {
      const recipient = {
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
        if (err) done(err);
        assert.equal(resp.object, 'recipient');
        assert.equal(resp.type, 'individual');
        assert.equal(resp.tax_id, 1234567890);
        expect(resp).to.include.keys('bank_account');
        assert.equal(resp.bank_account.last_digits, 7890);
        done();
      });
    });

    it('should be able to list all recipients', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        assert.equal(resp.data[0].object, 'recipient');
        expect(resp.data[0]).to.include.keys('type');
        expect(resp.data[0].type).not.be.null;
        expect(resp.data[0]).to.include.keys('tax_id');
        expect(resp.data[0]).to.include.keys('bank_account');
        done();
      });
    });

    it('should be able to update the recipient', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        if (err) done(err);
        const recipientId = resp.data[0].id;
        const updateData = {
          'name':   'Di Di',
          'email':  'di@omise.co',
          'tax_id': '9876543210',
        };
        testHelper.setupMock('recipients_update');
        omise.recipients.update(recipientId, updateData, function(err, resp) {
          if (err) done(err);
          assert.equal(resp.name, updateData.name);
          assert.equal(resp.email, updateData.email);
          assert.equal(resp.tax_id, updateData.tax_id);
          done();
        });
      });
    });

    it('should be able to retrieve the recipient', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        if (err) done(err);
        const recipientId = resp.data[0].id;
        testHelper.setupMock('recipients_retrieve');
        omise.recipients.retrieve(recipientId, function(err, resp) {
          if (err) done(err);
          assert.equal(resp.id, recipientId);
          done();
        });
      });
    });

    it('should be able to destroy the recipient', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        if (err) done(err);
        const recipients = resp.data;
        expect(resp.data).to.be.instanceof(Array);
        // atm, the first recipient is always a default, but cannot destroy
        expect(omise.recipients.destroy).instanceof(Function);
        if (recipients.length < 1) {
          done();
        }
        const recipientId = recipients[recipients.length - 1].id;
        testHelper.setupMock('recipients_destroy');
        omise.recipients.destroy(recipientId, function(err, resp) {
          if (err) done(err);
          assert.equal(resp.id, recipientId);
          assert.equal(resp.deleted, true);
          done();
        });
      });
    });
  });
});

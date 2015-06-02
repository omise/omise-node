'use strict';
var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Recipients', function() {

    it('should be able to create a recipient', function(done) {
      var recipient = {
        'name': 'John Doe',
        'description': 'John Doe (id: 30)',
        'email': 'john.doe@example.com',
        'type': 'individual',
        'tax_id': 1234567890,
        'bank_account': {
          'brand': 'bbl',
          'number': '1234567890',
          'name': 'John Doe'
        }
      };
      testHelper.setupMock('recipients_create');
      omise.recipients.create(recipient, function(err, resp) {
        expect(resp.object, 'recipient');
        expect(resp.type, 'individual');
        expect(resp.type, 1273456789);
        expect(resp).to.include.keys('bank_account');
        expect(resp.bank_account.last_digits, 7890);
        done();
      });
    });

    it('should be able to list all recipients', function(done) {
      testHelper.setupMock('recipients_list');
      omise.recipients.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'recipient');
        expect(resp.data[0]).to.include.keys('type')
        expect(resp.data[0].type).not.be.nil
        expect(resp.data[0]).to.include.keys('tax_id');
        expect(resp.data[0]).to.include.keys('bank_account');
        done();
      });
    });

    it('should be able to update the recipient', function(done) {
        testHelper.setupMock('recipients_list');
        omise.recipients.list(function(err, resp) {
          var recipient_id = resp.data[0].id;
          var update_data = {
            'name': 'Di Di',
            'email': 'di@omise.co',
            'tax_id': "9876543210"
          }
          testHelper.setupMock('recipients_update');
          omise.recipients.update(recipient_id, update_data, function(err, resp){
            expect(resp.name, update_data.name);
            expect(resp.email, update_data.email);
            expect(resp.tax_id, update_data.tax_id);
            done();
          });
        });
     });

  });
});

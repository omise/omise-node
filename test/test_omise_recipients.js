'use strict';
var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Recipients', function() {
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
  });
});

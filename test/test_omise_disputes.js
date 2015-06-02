'use strict';
var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Disputes', function() {
    it('should be able to list all disputes', function(done) {
      testHelper.setupMock('disputes_list');
      omise.disputes.list(function(err, resp) {
        expect(resp.object, 'list')
        expect(resp.data).to.be.instanceof(Array);
        done();
      });
    });
  });
});

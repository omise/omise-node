'use strict';

var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Sources', function() {
    var sourceParameters = {};

    before(function() {
      testHelper.setupMock('sources_create');
      sourceParameters = {
        type:     'internet_banking_bbl',
        amount:   '500000',
        currency: 'thb',
      };
    });

    it('should be able to create a source', function(done) {
      omise.sources.create(sourceParameters, function(err, resp) {
        var sourceID = resp.id;
        should.exist(sourceID);
        expect(sourceID).to.contains(('src_'));
        done(err);
      });
    });
  });
});

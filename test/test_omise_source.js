'use strict';

var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Sources', function() {
    var sourceID = '';
    var sourceParameters = {};

    before(function() {
      testHelper.setupMock('sources_create');
      sourceParameters = {
        type:              'installment_kbank',
        amount:            '500000',
        currency:          'thb',
        installment_terms: 4,
      };
    });

    it('should be able to create a source', function(done) {
      omise.sources.create(sourceParameters, function(err, resp) {
        sourceID = resp.id;
        should.exist(sourceID);
        expect(sourceID).to.contains(('src_'));
        var installmentTerms = resp.installment_terms;
        expect(installmentTerms).to.equal('4');
        done();
      });
    });
  });
});

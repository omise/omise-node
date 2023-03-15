'use strict';

const chai   = require('chai');
const expect = chai.expect;
const should = chai.should();

const config = require('./config');
const omise  = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Sources', function() {
    let sourceParameters = {};
    let sourceID = '';

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
        sourceID = resp.id;
        should.exist(sourceID);
        expect(sourceID).to.contains(('src_'));
        done(err);
      });
    });

    it('should be able to retrieve a source', function(done) {
      testHelper.setupMock('sources_retrieve');
      omise.sources.retrieve(sourceID, function(err, resp) {
        expect(resp.object, 'source');
        expect(resp).to.have.property('amount');
        resp.amount.should.equal(500000);
        done(err);
      });
    });
  });
});

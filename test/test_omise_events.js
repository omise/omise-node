const {expect, assert} = require('chai');
const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Events', function() {
    it('should be able to list events', function(done) {
      testHelper.setupMock('events_list');
      omise.events.list(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'list');
        expect(resp).to.have.property('data');
        expect(resp.data).to.be.a('array');
        assert.equal(resp.data[0].object, 'event');
        done();
      });
    });

    it('should be able to retrieve an event', function(done) {
      testHelper.setupMock('event_retrieve');
      omise.events.retrieve('evnt_test_52lfalk2p3ssnhwfoez',
        function(err, resp) {
          if (err) done(err);
          assert.equal(resp.object, 'event');
          assert.equal(resp.id, 'evnt_test_52lfalk2p3ssnhwfoez');
          assert.equal(resp.key, 'transfer.update');
          done();
        }
      );
    });
  });
});

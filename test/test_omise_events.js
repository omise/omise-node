var chai   = require('chai');
var expect = chai.expect;

var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Events', function() {
    it('should be able to list events', function(done) {
      testHelper.setupMock('events_list');
      omise.events.list(function(err, resp) {
        expect(resp.object, 'list');
        expect(resp).to.have.property('data');
        expect(resp.data).to.be.a('array');
        expect(resp.data[0].object, 'event');
        done(err);
      });
    });

    it('should be able to retrieve an event', function(done) {
      testHelper.setupMock('event_retrieve');
      omise.events.retrieve('evnt_test_52lfalk2p3ssnhwfoez',
        function(err, resp) {
          expect(resp.object, 'event');
          expect(resp.id, 'evnt_test_52lfalk2p3ssnhwfoez');
          expect(resp.key, 'charge.create');
          done(err);
        }
      );
    });
  });
});

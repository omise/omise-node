const {assert, expect} = require('chai');
const config = require('./config');
const omise  = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Links', function() {
    it('should be able to create a link', function(done) {
      const link = {
        'amount':      19000,
        'currency':    'thb',
        'multiple':    false,
        'title':       'Cappuccino',
        'description': 'Freshly brewed coffee',
      };
      testHelper.setupMock('links_create');
      omise.links.create(link, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'link');
        assert.equal(resp.amount, 19000);
        assert.equal(resp.used, false);
        done(err);
      });
    });

    it('should be able to list all links', function(done) {
      testHelper.setupMock('links_list');
      omise.links.list(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data.length).to.equal(2);
        assert.equal(resp.data[0].object, 'link');
        expect(resp.data[0]).to.include.keys('amount');
        expect(resp.data[0].amount).not.be.null;
        expect(resp.data[0]).to.include.keys('title');
        expect(resp.data[0]).to.include.keys('multiple');
        expect(resp.data[0]).to.include.keys('charges');
        expect(resp.data[0]).to.include.keys('payment_uri');
        done();
      });
    });
  });

  it('should be able to retrieve the link', function(done) {
    testHelper.setupMock('links_retrieve');
    omise.links.retrieve('link_test_576mf2s2gwt0nmkmmf6', function(err, resp) {
      if (err) done(err);
      assert.equal(resp.id, 'link_test_576mf2s2gwt0nmkmmf6');
      assert.equal(resp.object, 'link');
      expect(resp).to.include.keys('amount');
      expect(resp.amount).not.be.null;
      done();
    });
  });
});

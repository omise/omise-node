const {expect, assert, should} = require('chai');
const config = require('./config');
const omise  = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Charges', function() {
    let tokenId  = '';
    let chargeId = '';
    before(function(done) {
      testHelper.setupMock('tokens_create');
      const cardDetails = {
        'card': {
          'name':             'JOHN DOE',
          'city':             'Bangkok',
          'postal_code':      10320,
          'number':           '4242424242424242',
          'expiration_month': 2,
          'expiration_year':  2017,
          'security_code':    123,
        },
      };
      omise.tokens.create(cardDetails, function(err, resp) {
        if (err) done(err);
        should().exist(resp.id);
        tokenId = resp.id;
        expect(tokenId).to.contains('tokn_test');
        should().exist(resp.card.id);
        const cardId = resp.card.id;
        expect(cardId).to.contains('card_test');
        done();
      });
    });

    it('should be able to create a charge', function(done) {
      testHelper.setupMock('charges_create');
      const charge = {
        'description':       'Charge for order 3947',
        'amount':            '100000',
        'currency':          'thb',
        'capture':           false,
        'card':              tokenId,
        'webhook_endpoints': ['https://abc.com/webhook'],
      };
      omise.charges.create(charge, function(err, resp) {
        if (err) done(err);
        chargeId = resp.id;
        assert.equal(resp.object, 'charge');
        expect(chargeId).to.match(/^chrg_test/);
        expect(resp.capture).be.false;
        expect(resp.paid).be.false;
        done();
      });
    });

    it('should be able to reverse a charge', function(done) {
      testHelper.setupMock('charges_reverse');
      omise.charges.reverse(chargeId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'charge');
        resp.reversed.should.be.true;
        done();
      });
    });

    it('should be able to expire a charge', function(done) {
      testHelper.setupMock('charge_expire');
      omise.charges.expire(chargeId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'charge');
        expect(resp.expired).be.true;
        done();
      });
    });

    it('should be able to list charges', function(done) {
      testHelper.setupMock('charges_list');
      omise.charges.list(function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'list');
        expect(resp).to.have.property('data');
        expect(resp.data).to.be.a('array');
        done();
      });
    });

    it('should be able to limit charges list', function(done) {
      testHelper.setupMock('charges_list_data');
      omise.charges.list({limit: 1}, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'list');
        expect(resp).to.have.property('data');
        expect(resp.data).to.be.a('array');
        resp.limit.should.equal(1);
        done();
      });
    });

    it('should be able to retrieve a charge', function(done) {
      testHelper.setupMock('charges_retrieve');
      omise.charges.retrieve(chargeId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'charge');
        expect(resp).to.have.property('amount');
        resp.amount.should.equal(100000);
        done();
      });
    });

    it('should be able to update a charge', function(done) {
      testHelper.setupMock('charges_update');
      const data = {description: 'test description'};
      omise.charges.update(chargeId, data, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'charge');
        assert.equal(resp.description, 'test description');
        expect(resp.id).to.match(/^chrg_test/);
        done();
      });
    });

    it('should be able to capture a charge', function(done) {
      testHelper.setupMock('charges_capture');
      omise.charges.capture(chargeId, function(err, resp) {
        if (err) done(err);
        assert.equal(resp.object, 'charge');
        resp.paid.should.be.true;
        done();
      });
    });

    it('should be able to partially capture a charge', function(done) {
      testHelper.setupMock('charges_partial_capture');
      const captureAmount = 5000;
      omise.charges.capture(chargeId, {'capture_amount': captureAmount},
        function(err, resp) {
          if (err) done(err);
          assert.equal(resp.object, 'charge');
          assert.equal(resp.captured_amount, captureAmount);
          assert.equal(resp.authorization_type, 'pre_auth');
          assert.equal(resp.authorized_amount, 10000);
          resp.paid.should.be.true;
          done();
        });
    });
  });
});

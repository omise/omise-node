const chai   = require('chai');
const expect = chai.expect;
const should = chai.should();

const config = require('./config');
const omise = require('../index')(config);
const testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Refunds', function() {
    let tokenId = '';
    let refundId = '';
    let chargeId = '';

    it('should be able to create a refund', function(done) {
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
        tokenId = resp.id;
        should.exist(resp.card.id);
        testHelper.setupMock('charges_create');
        const charge = {
          'description': 'Charge for order 3947',
          'amount':      '100000',
          'currency':    'thb',
          'card':        tokenId,
        };
        omise.charges.create(charge, function(err, resp) {
          chargeId = resp.id;
          const amount = resp.amount;
          testHelper.setupMock('refunds_create');
          const data = {'amount': amount};
          omise.charges.createRefund(chargeId, data, function(err, resp) {
            expect(resp.id).to.match(/^rfnd_test/);
            expect(resp.object, 'refund');
            expect(resp.amount, data['amount']);
            expect(resp.currency, 'thb');
            done(err);
          });
        });
      });
    });

    it('should be able to list refunds', function(done) {
      testHelper.setupMock('refunds_list');
      omise.charges.listRefunds(chargeId, function(err, resp) {
        expect(resp.object, 'list');
        expect(resp.data).to.be.instanceof(Array);
        expect(resp.data[0].object, 'refund');
        refundId = resp.data[0].id;
        done(err);
      });
    });

    it('should be able to retrieve a refund', function(done) {
      testHelper.setupMock('refunds_retrieve');
      omise.charges.retrieveRefund(chargeId, refundId, function(err, resp) {
        expect(resp.object, 'refund');
        expect(resp.id).to.match(/^rfnd_test/);
        expect(resp.charge).to.match(/^chrg_test/);
        expect(resp.transaction).to.match(/^trxn_test/);
        done(err);
      });
    });
  });
});

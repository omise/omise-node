'use strict';
var chai   = require('chai');
var expect = chai.expect;

var config = require('./config');
var omise  = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function() {
  describe('#Charges (installment)', function() {
    it('should be able to create an SCB installment charge', function(done) {
      testHelper.setupMock('charge_installment_scb_create');

      var charge = {
        'amount':                   '300000',
        'currency':                 'thb',
        'capture':                  false,
        'return_uri':               'https://omise.co',
        'source[installment_term]': 3,
        'source[type]':             'installment_scb',
      };

      omise.charges.create(charge, function(err, resp) {
        expect(resp.object, 'charge');

        var chargeId = resp.id;
        expect(chargeId).to.match(/^chrg_test/);

        expect(resp.amount, 300000);
        expect(resp.capture).be.false;
        expect(resp.paid).be.false;
        expect(resp.source.flow, 'redirect');
        expect(resp.source.type, 'installment_scb');
        expect(resp.source.charge_status, 'pending');
        expect(resp.status, 'pending');
        expect(
          resp.authorize_uri,
          'http://pay.lvh.me:3000/payments/pay2_test_5lfs9kcp8au03mdqedt/authorize'
        );
        expect(resp.return_uri, 'https://omise.co');

        done(err);
      });
    });
  });
});

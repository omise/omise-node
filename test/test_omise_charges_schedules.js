'use strict';
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config');
var omise = require('../index')(config);
var testHelper = require('./testHelper');

describe('Omise', function () {
    describe('#Charge Schedules', function () {

        testHelper.setupMock('charge_schedules');

        it('should be able to list all charge schedules', function (done) {
            omise.charges.schedules(function (err, resp) {
                expect(resp.object, 'list');
                expect(resp.data).to.be.instanceof(Array);
                expect(resp.data[0].object, 'schedule');
                expect(resp.data[0]).to.include.keys('charge');
                expect(resp.data[0].charge).not.be.nil;
                done();
            });
        });
    });
});

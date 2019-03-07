var nock = require('nock');

var chargeID = 'chrg_test_4z429hvnv7ouolu6kmp';
var refundID = 'rfnd_test_4z5xxgntg3pzhhynae4';
var url      = '/charges/' + chargeID + '/refunds';
nock('https://api.omise.co')
  .persist()
  .post(url)
  .reply(200, {
    'object':      'refund',
    'id':          refundID,
    'location':    url + '/' + refundID,
    'amount':      100000,
    'currency':    'thb',
    'charge':      chargeID,
    'transaction': 'trxn_test_4z5xxgnzst7caoa8f79',
    'created':     '2015-02-24T10:39:26Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

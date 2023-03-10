const nock = require('nock');

const chargeID = 'chrg_test_4z429hvnv7ouolu6kmp';
const refundID = 'rfnd_test_4z5xxgntg3pzhhynae4';
const url      = '/charges/' + chargeID + '/refunds/' + refundID;
nock('https://api.omise.co')
  .persist()
  .get(url)
  .reply(200, {
    'object':      'refund',
    'id':          refundID,
    'location':    url,
    'amount':      100000,
    'currency':    'thb',
    'charge':      chargeID,
    'transaction': 'trxn_test_4z5xxgnzst7caoa8f79',
    'created':     '2015-02-24T10:39:26Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

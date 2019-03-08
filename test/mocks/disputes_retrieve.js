var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/disputes/dspt_test_5086xrjkbpx9zeep33r')
  .reply(200, {
    'object':   'dispute',
    'id':       'dspt_test_5086xrjkbpx9zeep33r',
    'livemode': false,
    'location': '/disputes/dspt_test_5086xrjkbpx9zeep33r',
    'amount':   100000,
    'currency': 'thb',
    'status':   'pending',
    'message':  'testing dispute',
    'charge':   'chrg_test_506bhcc5g7tchr1pifg',
    'created':  '2015-06-02T05:42:16Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

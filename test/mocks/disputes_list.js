const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/disputes')
  .reply(200, {
    'object': 'list',
    'from':   '1970-01-01T00:00:00+00:00',
    'to':     '2015-06-02T05:58:12+00:00',
    'offset': 0,
    'limit':  20,
    'total':  1,
    'data':   [{
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
    }],
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

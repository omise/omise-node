var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/disputes/closed')
  .reply(200, {
    'object': 'list',
    'from':   '1970-01-01T00:00:00+00:00',
    'to':     '2015-06-02T07:23:58+00:00',
    'offset': 0,
    'limit':  20,
    'total':  1,
    'data':   [{
      'object':   'dispute',
      'id':       'dspt_test_4zgf15h89w8t775kcm8',
      'livemode': false,
      'location': '/disputes/dspt_test_4zgf15h89w8t775kcm8',
      'amount':   100000,
      'currency': 'thb',
      'status':   'closed',
      'message':  'This is an unauthorized transaction',
      'charge':   'chrg_test_4zgcsiv4s6ewsy8nrw3',
      'created':  '2015-03-23T05:24:39Z',
    }],
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/transfers')
  .reply(200, {
    'object': 'list',
    'from':   '1970-01-01T00:00:00+00:00',
    'to':     '2015-02-20T10:30:50+00:00',
    'offset': 0,
    'limit':  20,
    'total':  1,
    'data':   [{
      'object':          'transfer',
      'id':              'trsf_test_4z4cw3ku87retguciji',
      'livemode':        false,
      'location':        '/transfers/trsf_test_4z4cw3ku87retguciji',
      'sent':            false,
      'paid':            false,
      'amount':          5000,
      'currency':        'thb',
      'failure_code':    null,
      'failure_message': null,
      'transaction':     null,
      'created':         '2015-02-20T09:26:19Z',
    }],
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

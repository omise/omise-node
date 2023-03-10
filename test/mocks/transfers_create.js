const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .post('/transfers')
  .reply(200, {
    'object':          'transfer',
    'id':              'trsf_test_4z4cw3ku87retguciji',
    'livemode':        false,
    'location':        '/transfers/trsf_test_4z4cw3ku87retguciji',
    'sent':            false,
    'paid':            false,
    'amount':          4000,
    'currency':        'thb',
    'failure_code':    null,
    'failure_message': null,
    'transaction':     null,
    'created':         '2015-02-20T09:26:19Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

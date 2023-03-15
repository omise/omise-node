const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/transactions')
  .reply(200, {
    'object': 'list',
    'from':   '1970-01-01T00:00:00+00:00',
    'to':     '2015-02-25T05:30:11+00:00',
    'offset': 0,
    'limit':  20,
    'total':  11,
    'data':   [{
      'object':   'transaction',
      'id':       'trxn_test_4yygd35y1sqbahaqmit',
      'type':     'credit',
      'amount':   384,
      'currency': 'THB',
      'created':  '2015-02-05T07:11:40Z',
    }, {
      'object':   'transaction',
      'id':       'trxn_test_4yywncqjz53uvid4rw7',
      'type':     'credit',
      'amount':   384,
      'currency': 'THB',
      'created':  '2015-02-06T10:57:06Z',
    }, {
      'object':   'transaction',
      'id':       'trxn_test_4z0106itqssy9kba84v',
      'type':     'credit',
      'amount':   95,
      'currency': 'THB',
      'created':  '2015-02-09T07:44:14Z',
    }],
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/recipients')
  .reply(200, {
    'object': 'list',
    'from':   '1970-01-01T00:00:00+00:00',
    'to':     '2015-06-02T04:04:14+00:00',
    'offset': 0,
    'limit':  20,
    'total':  2,
    'data':   [{
      'object':       'recipient',
      'id':           'recp_test_5085pqoioecnxqz0zvi',
      'livemode':     false,
      'location':     '/recipients/recp_test_5085pqoioecnxqz0zvi',
      'verified':     false,
      'active':       false,
      'name':         'John Doe',
      'email':        'john.doe@example.com',
      'description':  'John Doe (id: 30)',
      'type':         'individual',
      'tax_id':       '1234567890',
      'bank_account': {
        'object':      'bank_account',
        'brand':       'bbl',
        'last_digits': '7890',
        'name':        'John Doe',
        'created':     '2015-06-02T03:37:12Z',
      },
      'failure_code': null,
      'created':      '2015-06-02T03:37:12Z',
    }],
    'location': '/recipients',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

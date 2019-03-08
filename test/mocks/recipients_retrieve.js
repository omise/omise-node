var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/recipients/recp_test_5085pqoioecnxqz0zvi')
  .reply(200, {
    'object':       'recipient',
    'id':           'recp_test_5085pqoioecnxqz0zvi',
    'livemode':     false,
    'location':     '/recipients/recp_test_5085pqoioecnxqz0zvi',
    'verified':     true,
    'active':       true,
    'name':         'Di Di',
    'email':        'di@omise.co',
    'description':  'Default recipient',
    'type':         'individual',
    'tax_id':       '9876543210',
    'bank_account': {
      'object':      'bank_account',
      'brand':       'test',
      'last_digits': '6789',
      'name':        'DEFAULT BANK ACCOUNT',
      'created':     '2015-05-30T04:28:03Z',
    },
    'failure_code': null,
    'created':      '2015-05-30T04:28:03Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

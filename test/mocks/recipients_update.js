const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .patch('/recipients/recp_test_5085pqoioecnxqz0zvi')
  .reply(200, {
    'object':       'recipient',
    'id':           'recp_test_5085pqoioecnxqz0zvi',
    'livemode':     false,
    'location':     '/recipients/recp_test_5085pqoioecnxqz0zvi',
    'verified':     false,
    'active':       false,
    'name':         'Di Di',
    'email':        'di@omise.co',
    'description':  'John Doe (id: 30)',
    'type':         'individual',
    'tax_id':       '9876543210',
    'bank_account': {
      'object':         'bank_account',
      'brand':          'Bangkok Bank',
      'bank_code':      'bbl',
      'last_digits':    '7890',
      'name':           'John Doe',
      'created_at':     '2015-06-02T04:38:42Z',
      'account_number': '1234567890',
    },
    'failure_code': null,
    'created_at':      '2015-06-02T04:54:51Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

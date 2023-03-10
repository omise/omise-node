const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .post('/recipients')
  .reply(200, {
    'object':       'recipient',
    'id':           'recp_test_5086be32wsp9iy2exem',
    'livemode':     false,
    'location':     '/recipients/recp_test_5086be32wsp9iy2exem',
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
      'created':     '2015-06-02T04:38:42Z',
    },
    'failure_code': null,
    'created':      '2015-06-02T04:38:42Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

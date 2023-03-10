const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/account')
  .reply(200, {
    'object':  'account',
    'id':      'acct_123',
    'email':   'test@omise.co',
    'created': '2015-02-02T13:19:17Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

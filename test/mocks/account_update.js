var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .patch('/account')
  .reply(200, {
    'object': 'account',
    'id': 'acct_123',
    'email': 'test@omise.co',
    'webhook_uri': 'https://omise-flask-example.herokuapp.com/webhook',
    'created': '2015-02-02T13:19:17Z',
  }, {
    'server': 'nginx/1.1',
    'content-type': 'application/json',
  });

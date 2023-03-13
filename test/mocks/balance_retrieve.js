const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/balance')
  .reply(200, {
    'object':    'balance',
    'livemode':  false,
    'available': 97242,
    'total':     385524,
    'currency':  'thb',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

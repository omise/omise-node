const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .delete('/recipients/recp_test_5085pqoioecnxqz0zvi')
  .reply(200, {
    'object':   'recipient',
    'id':       'recp_test_5085pqoioecnxqz0zvi',
    'livemode': false,
    'deleted':  true,
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

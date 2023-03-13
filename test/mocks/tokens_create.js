const nock = require('nock');
nock('https://vault.omise.co')
  .persist()
  .post('/tokens')
  .reply(200, {
    'id':   'tokn_test_4xs9408a642a1htto8z',
    'card': {'id': 'card_test_4xs94086bpvq56tghuo'},
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

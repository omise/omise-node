var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .intercept('/transfers/trsf_test_4z4cw3ku87retguciji', 'DELETE')
  .reply(200, {
    'object':   'transfer',
    'id':       'trsf_test_4z4cw3ku87retguciji',
    'livemode': false,
    'deleted':  true,
  }, {'server': 'nginx/1.1', 'content-type': 'application/json'});

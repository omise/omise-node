const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .intercept('/customers/cust_test_4z2owmajzsb3c527wj7', 'DELETE')
  .reply(200, {
    'object':   'customer',
    'id':       'cust_test_4z2owmajzsb3c527wj7',
    'livemode': false,
    'deleted':  true,
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

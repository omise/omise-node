var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .intercept('/customers/cust_test_4z2owmajzsb3c527wj7/cards/card_test_4z2owrdmvbygi7ah0fu', 'DELETE')
  .reply(200, {
    "object": "card",
    "id": "card_test_4z2owrdmvbygi7ah0fu",
    "livemode": false,
    "deleted": true
  }, {
    server: 'nginx/1.1',
    'content-type': 'application/json'
  });

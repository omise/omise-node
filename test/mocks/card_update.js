var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .intercept('/customers/cust_test_4z2owmajzsb3c527wj7/cards/card_test_4z2owrdmvbygi7ah0fu', 'PATCH')
  .reply(200, {
    "object": "card",
    "id": "card_test_4z2owrdmvbygi7ah0fu",
    "livemode": false,
    "location": "/customers/cust_test_4z2owmajzsb3c527wj7/cards/card_test_4z2owrdmvbygi7ah0fu",
    "country": "us",
    "city": "Bangkok",
    "postal_code": "10320",
    "financing": "",
    "last_digits": "4242",
    "brand": "Visa",
    "expiration_month": 9,
    "expiration_year": 2022,
    "fingerprint": "umrBpbHRuc8vstbcNEZPbnKkIycR/gvI6ivW9AshKCw=",
    "name": "JOHN DOE",
    "security_code_check": true,
    "created": "2015-02-16T03:12:10Z"
  }, {
    server: 'nginx/1.1',
    'content-type': 'application/json',
  });

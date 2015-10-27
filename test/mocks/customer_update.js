var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .intercept('/customers/cust_test_4z2owmajzsb3c527wj7', 'PATCH')
  .reply(200, {
    "object": "customer",
    "id": "cust_test_4z2owmajzsb3c527wj7",
    "livemode": false,
    "location": "/customers/cust_test_4z2owmajzsb3c527wj7",
    "default_card": "card_test_4z2owrdmvbygi7ah0fu",
    "email": "johndoe@example.com",
    "description": "New description",
    "created": "2015-02-16T03:11:46Z",
    "cards": {
      "object": "list",
      "from": "1970-01-01T00:00:00+00:00",
      "to": "2015-02-18T08:33:34+00:00",
      "offset": 0,
      "limit": 20,
      "total": 1,
      "data": [{
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
        "expiration_month": 2,
        "expiration_year": 2017,
        "fingerprint": "umrBpbHRuc8vstbcNEZPbnKkIycR/gvI6ivW9AshKCw=",
        "name": "JOHN DOE",
        "security_code_check": true,
        "created": "2015-02-16T03:12:10Z"
      }],
      "location": "/customers/cust_test_4z2owmajzsb3c527wj7/cards"
    }
  }, {
    server: 'nginx/1.1',
    'content-type': 'application/json',
  });

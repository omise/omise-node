var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/charges/chrg_test_4z429hvnv7ouolu6kmp/refunds')
  .reply(200, {
    "object": "list",
    "from": "1970-01-01T00:00:00+00:00",
    "to": "2015-02-24T10:53:01+00:00",
    "offset": 0,
    "limit": 20,
    "total": 1,
    "data": [{
      "object": "refund",
      "id": "rfnd_test_4z5xxgntg3pzhhynae4",
      "location": "/charges/chrg_test_4z429hvnv7ouolu6kmp/refunds/rfnd_test_4z5xxgntg3pzhhynae4",
      "amount": 100000,
      "currency": "thb",
      "charge": "chrg_test_4z4295deewwyaviw003",
      "transaction": "trxn_test_4z5xxgnzst7caoa8f79",
      "created": "2015-02-24T10:39:26Z"
    }],
    "location": "/charges/chrg_test_4z429hvnv7ouolu6kmp/refunds"
  }, {
    server: 'nginx/1.1',
    'content-type': 'application/json',
  });

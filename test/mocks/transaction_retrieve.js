var nock  = require('nock');
var scope = nock('https://api.omise.co')
            .persist()
            .get('/transactions/trxn_test_4z5gp0t3mpfsu28u8jo')
            .reply(200, { "object": "transaction",
                          "id": "trxn_test_4z5gp0t3mpfsu28u8jo",
                          "type": "credit",
                          "amount": 96094,
                          "currency": "THB",
                          "created": "2015-02-23T05:16:54Z"
                        }, { server: 'nginx/1.1', 'content-type': 'application/json', });

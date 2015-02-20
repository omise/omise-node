var nock  = require('nock');
var scope = nock('https://api.omise.co')
            .persist()
            .intercept('/customers/cust_test_4yygdeiu4ko863sxts9', 'DELETE')
            .reply(200, { "object": "customer",
                          "id": "cust_test_4yygdeiu4ko863sxts9",
                          "livemode": false,
                          "deleted": true
                         }, { server: 'nginx/1.1', 'content-type': 'application/json', });

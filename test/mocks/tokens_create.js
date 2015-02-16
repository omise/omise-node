var nock  = require('nock');
var scope = nock('https://vault.omise.co')
            .persist()
            .post('/tokens')
            .reply(200, {'card': {'id': 'card_test'}},
             { server: 'nginx/1.1',
             'content-type': 'application/json',
             });
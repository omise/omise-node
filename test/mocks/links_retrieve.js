const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/links/link_test_576mf2s2gwt0nmkmmf6')
  .reply(200, {
    'object':      'link',
    'id':          'link_test_576mf2s2gwt0nmkmmf6',
    'livemode':    false,
    'location':    '/links/link_test_576mf2s2gwt0nmkmmf6',
    'amount':      99999900,
    'currency':    'thb',
    'used':        false,
    'multiple':    true,
    'title':       'Omise Rocket',
    'description': 'Nice and cool rocket to Mars',
    'charges':     {
      'object':   'list',
      'from':     '1970-01-01T07:00:00+07:00',
      'to':       '2017-03-03T19:22:33+07:00',
      'offset':   0,
      'limit':    20,
      'total':    0,
      'order':    null,
      'location': '/links/link_test_576mf2s2gwt0nmkmmf6/charges',
      'data':     [],
    },
    'payment_uri': 'http://link.example.com/407385D0',
    'created':     '2017-03-03T12:10:32Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

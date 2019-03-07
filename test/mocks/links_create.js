var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .post('/links')
  .reply(200, {
    'object':      'link',
    'id':          'link_test_576mha4pdwrzyqlpl1n',
    'livemode':    false,
    'location':    '/links/link_test_576mha4pdwrzyqlpl1n',
    'amount':      19000,
    'currency':    'thb',
    'used':        false,
    'multiple':    false,
    'title':       'Cappuccino',
    'description': 'Freshly brewed coffee',
    'charges':     {
      'object':   'list',
      'from':     '1970-01-01T07:00:00+07:00',
      'to':       '2017-03-03T19:22:33+07:00',
      'offset':   0,
      'limit':    20,
      'total':    0,
      'order':    null,
      'location': '/links/link_test_576mha4pdwrzyqlpl1n/charges',
      'data':     [],
    },
    'payment_uri': 'http://link.example.com/0BB268C6',
    'created':     '2017-03-03T12:16:48Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

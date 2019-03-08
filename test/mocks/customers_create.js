var nock = require('nock');

var custID = 'cust_test_4z2p1qpnjvkqj6z65c0';
var cardID = 'card_test_4z2p1xz7uuiunks6sf5';
nock('https://api.omise.co')
  .persist()
  .post('/customers')
  .reply(200, {
    'object':       'customer',
    'id':           'cust_test_4z2owmajzsb3c527wj7',
    'livemode':     false,
    'location':     '/customers/' + custID,
    'default_card': cardID,
    'email':        'john.doe@example.com',
    'description':  'John Doe (id: 30)',
    'created':      '2015-02-16T03:26:19Z',
    'cards':        {
      'object': 'list',
      'from':   '1970-01-01T00:00:00+00:00',
      'to':     '2015-02-16T03:26:19+00:00',
      'offset': 0,
      'limit':  20,
      'total':  1,
      'data':   [{
        'object':              'card',
        'id':                  cardID,
        'livemode':            false,
        'location':            '/customers/' + custID + '/cards/' + cardID,
        'country':             'us',
        'city':                'Bangkok',
        'postal_code':         '10320',
        'financing':           '',
        'last_digits':         '4242',
        'brand':               'Visa',
        'expiration_month':    2,
        'expiration_year':     2017,
        'fingerprint':         'umrBpbHRuc8vstbcNEZPbnKkIycR/gvI6ivW9AshKCw=',
        'name':                'JOHN DOE',
        'security_code_check': true,
        'created':             '2015-02-16T03:26:53Z',
      }],
      'location': '/customers/' + custID + '/cards',
    },
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

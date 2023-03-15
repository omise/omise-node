const nock = require('nock');

const custID = 'cust_test_4z2owmajzsb3c527wj7';
const cardID = 'card_test_4z2owrdmvbygi7ah0fu';
nock('https://api.omise.co')
  .persist()
  .intercept('/customers/' + custID, 'PATCH')
  .reply(200, {
    'object':       'customer',
    'id':           custID,
    'livemode':     false,
    'location':     '/customers/' + custID,
    'default_card': cardID,
    'email':        'johndoe@example.com',
    'description':  'New description',
    'created':      '2015-02-16T03:11:46Z',
    'cards':        {
      'object': 'list',
      'from':   '1970-01-01T00:00:00+00:00',
      'to':     '2015-02-18T08:33:34+00:00',
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
        'created':             '2015-02-16T03:12:10Z',
      }],
      'location': '/customers/' + custID + '/cards',
    },
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

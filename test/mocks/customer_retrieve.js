const nock = require('nock');

const custID  = 'cust_test_4z2owmajzsb3c527wj7';
const cardID  = 'card_test_4z70ihpsgokp70hxqnq';
const custURL = '/customers/' + custID;
const cardURL = custURL + '/cards';
nock('https://api.omise.co')
  .persist()
  .get(custURL)
  .reply(200, {
    'object':       'customer',
    'id':           'cust_test_4z2owmajzsb3c527wj7',
    'livemode':     false,
    'location':     custURL,
    'default_card': 'card_test_4z70ihpsgokp70hxqnq',
    'email':        'john.doe@example.com',
    'description':  'John Doe (id: 30)',
    'created':      '2015-02-27T04:25:19Z',
    'cards':        {
      'object': 'list',
      'from':   '1970-01-01T00:00:00+00:00',
      'to':     '2015-02-28T10:13:25+00:00',
      'offset': 0,
      'limit':  20,
      'total':  1,
      'data':   [{
        'object':              'card',
        'id':                  cardID,
        'livemode':            false,
        'location':            cardURL + '/' + cardID,
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
        'created':             '2015-02-27T04:25:19Z',
      }],
      'location': cardURL,
    },
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

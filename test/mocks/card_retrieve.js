const nock = require('nock');

const chargeID = 'cust_test_4z2owmajzsb3c527wj7';
const cardID   = 'card_test_4z2owrdmvbygi7ah0fu';
const url      = '/customers/' + chargeID + '/cards/' + cardID;
nock('https://api.omise.co')
  .persist()
  .get(url)
  .reply(200, {
    'object':              'card',
    'id':                  cardID,
    'livemode':            false,
    'location':            url,
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
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

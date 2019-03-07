var nock = require('nock');

var chargeID   = 'chrg_test_4z429hvnv7ouolu6kmp';
var chargeURL  = '/charges/' + chargeID;
var paymentID  = 'paym_4z5goqdw6rblbxztm4c';
var captureURL = chargeURL + '/capture';
var paymentURL = 'https://api.omise.co/payments/' + paymentID + '/authorize';
nock('https://api.omise.co')
  .persist()
  .post(captureURL)
  .reply(200, {
    'object':      'charge',
    'id':          chargeID,
    'livemode':    false,
    'location':    chargeURL,
    'amount':      100000,
    'currency':    'thb',
    'description': 'Charge for order 3947',
    'capture':     false,
    'authorized':  true,
    'reversed':    false,
    'paid':        true,
    'transaction': 'trxn_test_4z5gp0t3mpfsu28u8jo',
    'refunded':    0,
    'refunds':     {
      'object': 'list',
      'from':   '1970-01-01T00:00:00+00:00',
      'to':     '2015-02-23T05:16:54+00:00',
      'offset': 0,
      'limit':  20,
      'total':  0,
      'data':   [

      ],
      'location': chargeURL + '/refunds',
    },
    'return_uri':      'http://www.example.com/orders/3947/complete',
    'reference':       paymentID,
    'authorize_uri':   paymentURL,
    'failure_code':    null,
    'failure_message': null,
    'card':            {
      'object':              'card',
      'id':                  'card_test_4z5gogdycbrium283yk',
      'livemode':            false,
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
      'created':             '2015-02-23T05:15:18Z',
    },
    'customer': null,
    'ip':       null,
    'created':  '2015-02-23T05:16:05Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

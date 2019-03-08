var nock = require('nock');
nock('https://vault.omise.co')
  .persist()
  .get('/tokens/tokn_test_4xs9408a642a1htto8z')
  .reply(200, {
    'object':   'token',
    'id':       'tokn_test_4z69sehi504pxca6umk',
    'livemode': false,
    'location': '/tokens/tokn_test_4xs9408a642a1htto8z',
    'used':     false,
    'card':     {
      'object':              'card',
      'id':                  'card_test_4z69sehh1iv7gs90vpn',
      'livemode':            false,
      'country':             'us',
      'city':                'Bangkok',
      'postal_code':         '10320',
      'financing':           '',
      'last_digits':         '4242',
      'brand':               'Visa',
      'expiration_month':    10,
      'expiration_year':     2018,
      'fingerprint':         'umrBpbHRuc8vstbcNEZPbnKkIycR/gvI6ivW9AshKCw=',
      'name':                'Somchai Prasert',
      'security_code_check': true,
      'created':             '2015-02-25T06:52:15Z',
    },
    'created': '2015-02-25T06:52:15Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

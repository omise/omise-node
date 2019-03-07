var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/events/evnt_test_52lfalk2p3ssnhwfoez')
  .reply(200, {
    'object':   'event',
    'id':       'evnt_test_52lfalk2p3ssnhwfoez',
    'livemode': false,
    'location': '/events/evnt_test_52lfalk2p3ssnhwfoez',
    'key':      'transfer.update',
    'created':  '2016-01-06T03:34:35Z',
    'data':     {
      'object':       'transfer',
      'id':           'trsf_test_52lfalf6pgy848klk71',
      'livemode':     false,
      'location':     '/transfers/trsf_test_52lfalf6pgy848klk71',
      'recipient':    'recp_test_506zyybg8wds93djm0r',
      'bank_account': {
        'object':      'bank_account',
        'brand':       'test',
        'last_digits': '6789',
        'name':        'DEFAULT BANK ACCOUNT',
        'created':     '2015-05-30T04:28:09Z',
      },
      'sent':            false,
      'paid':            false,
      'amount':          5000,
      'currency':        'thb',
      'fee':             3000,
      'failure_code':    null,
      'failure_message': null,
      'transaction':     null,
      'created':         '2016-01-06T03:34:34Z',
    },
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

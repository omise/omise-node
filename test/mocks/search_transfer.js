var nock = require('nock');


var url = '/search?scope=transfer';
nock('https://api.omise.co')
  .persist()
  .get(url)
  .reply(200, {
    'object':      'search',
    'order':       'reverse_chronological',
    'scope':       'transfer',
    'export':      null,
    'query':       '',
    'filters':     {},
    'page':        1,
    'per_page':    1,
    'location':    '/search',
    'total_pages': 2,
    'total':       2,
    'data':        [
      {
        'object':       'transfer',
        'id':           'trsf_test_no1t4tnemucod0e51mo',
        'livemode':     false,
        'location':     '/transfers/trsf_test_no1t4tnemucod0e51mo',
        'recipient':    'recp_test_no1t4tnemucod0e51mo',
        'bank_account': {
          'object':      'bank_account',
          'brand':       'test',
          'last_digits': '6789',
          'name':        'DEFAULT BANK ACCOUNT',
          'created':     '2019-12-31T12:59:59Z',
        },
        'sent':            false,
        'paid':            false,
        'amount':          47448,
        'currency':        'thb',
        'fee':             3000,
        'sendable':        true,
        'fail_fast':       false,
        'failure_code':    null,
        'failure_message': null,
        'transaction':     null,
        'schedule':        null,
        'created':         '2019-12-31T12:59:59Z',
        'sent_at':         null,
        'paid_at':         null,
        'metadata':        {},
      },
    ],
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/charges?limit=1')
  .reply(200, {
    object: 'list',
    from:   '1970-01-01T00:00:00+00:00',
    to:     '2016-01-04T04:01:10+00:00',
    offset: 0,
    limit:  1,
    total:  21,
    order:  'chronological',
    data:   [{
      object:          'charge',
      id:              'chrg_test_50zn6xe6t7lip67oy78',
      livemode:        false,
      location:        '/charges/chrg_test_50zn6xe6t7lip67oy78',
      amount:          100000,
      currency:        'thb',
      description:     'test description',
      status:          'successful',
      capture:         false,
      authorized:      true,
      reversed:        false,
      paid:            true,
      transaction:     'trxn_test_50zn6xotiaabible1cx',
      refunded:        0,
      refunds:         [Object],
      failure_code:    null,
      failure_message: null,
      card:            [Object],
      customer:        null,
      ip:              null,
      dispute:         null,
      created:         '2015-08-11T10:08:19Z',
    }],
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

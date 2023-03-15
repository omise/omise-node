const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/customers')
  .reply(200, {
    object: 'list',
    from:   '1970-01-01T00:00:00+00:00',
    to:     '2015-02-17T05:14:32+00:00',
    offset: 0,
    limit:  20,
    total:  10,
    data:   [{
      object:       'customer',
      id:           'cust_test_4yxn6vblxh83h605oxz',
      livemode:     false,
      location:     '/customers/cust_test_4yxn6vblxh83h605oxz',
      default_card: 'card_test_4yy2wa1yvkagkcxcgif',
      email:        'john.doe@example.com',
      description:  'John Doe (id: 30)',
      created:      '2015-02-03T05:28:15Z',
      cards:        [Object],
    }, {
      object:       'customer',
      id:           'cust_test_4yygdeiu4ko863sxts9',
      livemode:     false,
      location:     '/customers/cust_test_4yygdeiu4ko863sxts9',
      default_card: 'card_test_4yygde8bubfe1akwqq3',
      email:        null,
      description:  'WooCommerce customer 1',
      created:      '2015-02-05T07:12:33Z',
      cards:        [Object],
    }],
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

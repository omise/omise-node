var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .post('/sources')
  .reply(200, {
    object:   'source',
    id:       'src_5lg5gs7vmxs23fm7qet',
    type:     'installment_scb',
    flow:     'redirect',
    amount:   300000,
    currency: 'thb',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

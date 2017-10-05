var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .post('/sources')
  .reply(200, {
    object:            'source',
    id:                'src_59j29ziij981q3afo1y',
    type:              'installment_kbank',
    flow:              'redirect',
    amount:            500000,
    currency:          'thb',
    installment_terms: '4',
  }, {
    'server': 'nginx/1.1',
    'content-type': 'application/json',
  });

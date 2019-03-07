var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .patch('/disputes/dspt_test_4zgf15h89w8t775kcm8')
  .reply(201, {
    'object':   'dispute',
    'id':       'dspt_test_4zgf15h89w8t775kcm8',
    'livemode': false,
    'location': '/disputes/dspt_test_4zgf15h89w8t775kcm8',
    'amount':   100000,
    'currency': 'thb',
    'status':   'pending',
    'message':  'Unauthorized transaction',
    'charge':   'chrg_test_506b1ozr4u8qkxieylo',
    'created':  '2015-06-02T08:09:49Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

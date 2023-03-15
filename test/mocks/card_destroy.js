const nock = require('nock');
const custID = 'cust_test_4z2owmajzsb3c527wj7';
const cardID = 'card_test_4z2owrdmvbygi7ah0fu';
nock('https://api.omise.co')
  .persist()
  .intercept('/customers/' + custID + '/cards/' + cardID, 'DELETE')
  .reply(200, {
    'object':   'card',
    'id':       cardID,
    'livemode': false,
    'deleted':  true,
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

var nock = require('nock');

var scheduleID = 'schd_test_57s33hm9fg1pzcqihxs';
nock('https://api.omise.co')
  .persist()
  .intercept('/schedules/' + scheduleID, 'DELETE')
  .reply(200, {
    'object': 'schedule',
    'id': scheduleID,
    'livemode': false,
    'deleted': true,
  }, {
    'server': 'nginx/1.1',
    'content-type': 'application/json',
  });

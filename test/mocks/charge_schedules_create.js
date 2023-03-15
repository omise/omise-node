const nock = require('nock');

const customerID = 'cust_test_5a4j05pd5uuk0y6y6ls';
const chargeScheduleID = 'schd_test_5aikygh29nc6u68xuib';
const cardID = 'card_test_5a4j05gs3evyhnywwg8';

nock('https://api.omise.co')
  .persist()
  .post('/schedules')
  .reply(200, {
    'object':   'schedule',
    'id':       chargeScheduleID,
    'livemode': false,
    'location': '/schedules/' + chargeScheduleID,
    'status':   'active',
    'every':    1,
    'period':   'month',
    'on':       {
      'days_of_month': [
        1,
      ],
    },
    'in_words':   'Every 1 month(s) on the 1st',
    'start_date': '2018-01-04',
    'end_date':   '2019-01-04',
    'charge':     {
      'amount':      200000,
      'currency':    'thb',
      'description': 'schedule charge id:1',
      'customer':    customerID,
      'card':        cardID,
    },
    'occurrences': {
      'object':   'list',
      'from':     '1970-01-01T00:00:00Z',
      'to':       '2018-03-02T07:38:41Z',
      'offset':   0,
      'limit':    20,
      'total':    3,
      'order':    null,
      'location': '/schedules/' + chargeScheduleID + '/occurrences',
      'data':     [
        {
          'object':        'occurrence',
          'id':            'occu_test_5aikygh5c4qhpulod8v',
          'livemode':      false,
          'location':      '/occurrences/occu_test_5aikygh5c4qhpulod8v',
          'schedule':      chargeScheduleID,
          'schedule_date': '2018-02-01',
          'retry_date':    null,
          'processed_at':  '2018-02-01T01:31:53Z',
          'status':        'successful',
          'message':       null,
          'result':        'chrg_test_5ath86asi8q61o7ip6u',
          'created':       '2018-01-04T04:55:30Z',
        },
      ],
    },
    'next_occurrence_dates': [
      '2018-03-01',
      '2018-04-01',
      '2018-05-01',
      '2018-06-01',
      '2018-07-01',
      '2018-08-01',
      '2018-09-01',
      '2018-10-01',
      '2018-11-01',
      '2018-12-01',
      '2019-01-01',
    ],
    'created': '2018-01-04T04:55:30Z',
  }, {
    'server':       'nginx/1.1',
    'content-type': 'application/json',
  });

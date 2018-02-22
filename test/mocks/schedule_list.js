var nock = require('nock');

var scheduleID = 'schd_test_57s33hm9fg1pzcqihxs';
var url      = '/schedules';

nock('https://api.omise.co')
  .persist()
  .get(url)
  .reply(200, {
    'object': 'list',
    'from': '1970-01-01T00:00:00+00:00',
    'to': '2018-02-24T10:53:01+00:00',
    'offset': 0,
    'limit': 20,
    'total': 1,
    'data': [{
      'object': 'schedule',
      'id': scheduleID,
      'livemode': false,
      'location': '/schedules/' + scheduleID,
      'status': 'active',
      'every': 1,
      'period': 'month',
      'on': {
        'days_of_month': [2],
      },
      'in_words': 'Every 1 month(s) on the 2nd',
      'start_date': '2017-04-27',
      'end_date': '2018-04-27',
      'charge': {
        'amount': 88800,
        'currency': 'thb',
        'description': 'Monthly membership fee',
        'customer': 'cust_test_55bb3hkywglfyyachha',
        'card': 'card_test_55bb3fhl3tc1wr9d51d',
      },
      'occurrences': {
        'object': 'list',
        'from': '1970-01-01T00:00:00+00:00',
        'to': '2017-05-16T11:30:41+00:00',
        'offset': 0,
        'limit': 20,
        'total': 1,
        'order': null,
        'location': '/schedules/' + scheduleID + '/occurrences',
        'data': [
          {
            'object': 'occurrence',
            'id': 'occu_test_57s33hmja9t3fs4wmop',
            'location': '/occurrences/occu_test_57s33hmja9t3fs4wmop',
            'schedule': scheduleID,
            'schedule_date': '2017-05-02',
            'retry_date': null,
            'processed_at': '2017-05-02T01:30:00Z',
            'status': 'successful',
            'message': null,
            'result': 'chrg_test_57tx012c753e2pzawzy',
            'created': '2017-04-27T09:10:11Z',
          },
        ],
      },
      'next_occurrences': [
        '2017-06-02',
        '2017-07-02',
        '2017-08-02',
        '2017-09-02',
        '2017-10-02',
        '2017-11-02',
        '2017-12-02',
        '2018-01-02',
        '2018-02-02',
        '2018-03-02',
        '2018-04-02',
      ],
      'created': '2017-04-27T09:10:11Z',
    }],
    'location': url,
  }, {
    'server': 'nginx/1.1',
    'content-type': 'application/json',
  });

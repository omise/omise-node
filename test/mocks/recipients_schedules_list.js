const nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/recipients/recp_test_58dw0pqszjc9hlv8gbo/schedules')
  .reply(200, {
    'object':   'list',
    'from':     '1970-01-01T00:00:00Z',
    'to':       '2018-06-21T03:57:59Z',
    'offset':   0,
    'limit':    20,
    'total':    1,
    'order':    'chronological',
    'location': '/transfers/schedules',
    'data':     [
      {
        'object':   'schedule',
        'id':       'schd_test_5cc9ygd384j50oxv2nw',
        'livemode': false,
        'location': '/schedules/schd_test_5cc9ygd384j50oxv2nw',
        'status':   'active',
        'every':    1,
        'period':   'month',
        'on':       {
          'days_of_month': [
            1,
          ],
        },
        'in_words':   'Every 1 month(s) on the 1st',
        'start_date': '2018-06-21',
        'end_date':   '2019-06-21',
        'transfer':   {
          'recipient':             'recp_test_58dw0pqszjc9hlv8gbo',
          'amount':                100000,
          'percentage_of_balance': null,
          'currency':              'thb',
        },
        'occurrences': {
          'object':   'list',
          'from':     '1970-01-01T00:00:00Z',
          'to':       '2018-06-21T03:57:59Z',
          'offset':   0,
          'limit':    20,
          'total':    0,
          'order':    null,
          'location': '/schedules/schd_test_5cc9ygd384j50oxv2nw/occurrences',
          'data':     [

          ],
        },
        'next_occurrences_on': [
          '2018-07-01',
          '2018-08-01',
          '2018-09-01',
          '2018-10-01',
          '2018-11-01',
          '2018-12-01',
          '2019-01-01',
          '2019-02-01',
          '2019-03-01',
          '2019-04-01',
          '2019-05-01',
          '2019-06-01',
        ],
        'created_at': '2018-06-21T03:57:29Z',
      },
    ],
  });

'use strict';

// More information: https://www.omise.co/transfer-schedules-api
var omise = require('../index')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

// Transfer every 2 days
var transferEvery2Days = {
  every: 2,
  period: 'day',
  start_date: '2018-01-01',
  end_date: '2018-12-01',
  transfer: {
    recipient: 'recp_test_57m2wcnfx96k634rkqq',
    amount: 1000000,
  },
};

omise.schedules.create(transferEvery2Days, function(err, resp) {
  if (err) {
    console.log('error', err);
    return;
  }

  console.log(resp.next_occurrence_dates);
});

// Charge on the 1st day of each month
var monthlyTransfer = {
  every: 1,
  period: 'month',
  start_date: '2018-01-01',
  end_date: '2018-12-01',
  on: {
    days_of_month: [1],
  },
  transfer: {
    recipient: 'recp_test_57m2wcnfx96k634rkqq',
  },
};

omise.schedules.create(monthlyTransfer, function(err, schedule) {
  if (err) {
    console.log('error', err);
    return;
  }
  // Print out schedules
  console.log(schedule.next_occurrence_dates);
});

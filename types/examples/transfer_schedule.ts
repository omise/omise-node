import omise = require('../index');

const transferEvery2Days = {
  every: 2,
  period: 'day',
  start_date: '2018-01-01',
  end_date: '2018-12-01',
  transfer: {
    recipient: 'recp_test_57m2wcnfx96k634rkqq',
    amount: 1000000,
  },
};

const omiseStatic = omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

omiseStatic.schedules.create(transferEvery2Days, (err, resp) => {
  console.log(resp.next_occurrence_dates);
});

const monthlyTransfer = {
  every:      1,
  period:     'month',
  start_date: '2018-01-01',
  end_date:   '2018-12-01',
  on: {
    days_of_month: [1],
  },
  transfer: {
    recipient: 'recp_test_57m2wcnfx96k634rkqq',
    // Omit account to transfer the whole balance
  },
};

omiseStatic.schedules.create(monthlyTransfer, (err, schedule) => {
  if (err) {
    console.log('error', err);
    return;
  }

  // Print out schedules
  console.log(schedule.next_occurrence_dates);
});

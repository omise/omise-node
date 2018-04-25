import omise = require('../index');

const chargeEvery2Days = {
  every: 2,
  period: 'day',
  start_date: '2018-01-01',
  end_date: '2018-12-01',
  charge: {
    customer: 'cust_test_57m2wcnfx96k634rkqq',
    card: 'card_test_57m2w8iemdovs4f92m2',
    amount: 1000000,
    description: 'Membership fee',
  },
};

const omiseStatic = omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

omiseStatic.schedules.create(chargeEvery2Days, (err, resp) => {
  console.log(resp.next_occurrence_dates);
});

const monthlyCharge = {
  every:      1,
  period:     'month',
  start_date: '2018-01-01',
  end_date:   '2018-12-01',
  on: {
    days_of_month: [1],
  },
  charge: {
    customer:    'cust_test_57m2wcnfx96k634rkqq',
    card:        'card_test_57m2w8iemdovs4f92m2',
    amount:      1000000,
    description: 'Membership fee',
  },
};

omiseStatic.schedules.create(monthlyCharge, (err, schedule) => {
  if (err) {
    console.log('error', err);
    return;
  }

  // Print out schedules
  console.log(schedule.next_occurrence_dates);
});

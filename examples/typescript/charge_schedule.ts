import { Schedules } from "../../types";
import omise from "./index";

const chargeEvery2Days: Schedules.ICreateSchedule = {
  every: 5,
  period: 'day',
  start_date: '2024-11-01',
  end_date: '2024-12-24',
  charge: {
    customer: 'cust_60dw2h7vc8pwuiy9hag',
    card: 'card_60dw2h37jxtw38wk355',
    amount: 100000,
    description: 'Membership fee 2',
  },
};

omise.schedules.create(chargeEvery2Days, (err: Error | null, resp: Schedules.ISchedule) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(resp.next_occurrences_on);
});

const monthlyCharge: Schedules.ICreateSchedule = {
  every:      1,
  period:     'month',
  start_date: '2024-11-01',
  end_date: '2025-06-24',
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

omise.schedules.create(monthlyCharge, (err: Error | null, schedule: Schedules.ISchedule) => {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(schedule.next_occurrences_on);
});

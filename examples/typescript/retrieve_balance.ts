import omise from './index';
import { Balance } from '../../types';

omise.balance.retrieve((err: Error | null, resp: Balance.IBalance) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

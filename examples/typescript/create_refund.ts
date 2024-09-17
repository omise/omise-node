import omise from './index';
import { Charges } from '../../types';

const chargeId = 'chrg_611ra3ab9wmcrm5wmue';
omise.charges.createRefund(chargeId, { amount: 200000 }, function(err: Error | null, resp: Charges.IRefundResponse) {
  if(err) {
    console.log(err)
  }
  console.log(resp);
});

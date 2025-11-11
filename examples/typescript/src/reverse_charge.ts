import omise from './index';
import { Charges } from 'omise';

const chargeId = 'chrg_611rm8n5dxzxv80yd01'
omise.charges.reverse(chargeId, function(err: Error | null, response: Charges.ICharge) {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(response)
});

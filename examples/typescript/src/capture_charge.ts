import omise from './index';
import { Charges } from 'omise';

const chargeId = 'chrg_65mh1gpv7mgvu84apma'
// Capture full charge amount
omise.charges.capture(chargeId, function (err: Error | null, response: Charges.ICharge) {
  if (err) {
    console.log('error', err);
    return;
  }
  console.log(response)
});

// Capture partial charge amount
omise.charges.capture(chargeId, { capture_amount: 2000 }, (_err, _response) => {});

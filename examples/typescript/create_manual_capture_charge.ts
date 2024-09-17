import omise from './index';
import { Charges, Tokens } from '../../types';

let cardDetails = {
  card: {
    name: "Gaurav",
    number: "4242424242424242",
    expiration_month: 2,
    expiration_year: 2025,
    security_code: "123",
  },
};

omise.tokens.create(cardDetails, function(err: Error | null, token: Tokens.IToken) {
  if (err) {
    console.log('error', err);
    return;
  }

  const chargePayload: Charges.IRequest = {
    amount:     900000,
    currency:   'thb',
    return_uri: 'http://example.com',
    card:       token.id,
    capture: false,
  }

  omise.charges.create(chargePayload, function(err: Error | null, charge: Charges.ICharge) {
    if (err) {
      console.log('error', err);
      return;
    }

    console.log('charge', charge);
  });
});

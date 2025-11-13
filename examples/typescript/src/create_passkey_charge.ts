import omiseClient from './index';
import { Authentication } from 'omise';

const card = {
  name: 'Omise',
  number: '5453011910000148',
  expiration_month: 2,
  expiration_year: '2030',
  security_code: '123',
  // Passkey requires either email or phone number
  email: 'dev@omise.co',
  phone_number: '+66000000000',
};

try {
  const token = await omiseClient.tokens.create({ card })
  const charge = await omiseClient.charges.create({
    amount: 100000,
    currency: 'thb',
    return_uri: 'http://example.com',
    card: token.id,
    authentication: Authentication.Passkey,
  })

  console.log(charge.id, 'created with authentication', charge.authenticated_by);
} catch (err) {
  console.log('error', err);
}

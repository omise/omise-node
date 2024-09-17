import omise from './index';
import { Recipients } from '../../types';

const recipientBody: Recipients.IRequest = {
  name: 'Recipient name',
  email: 'recipient@example.com',
  type: 'individual',
  bank_account: {
    bank_code: 'bbl',
    number: '123456789',
    name: 'Reci Pient',
  },
};
omise.recipients.create(recipientBody, (err: Error | null, resp: Recipients.IRecipient) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

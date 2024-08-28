import omiseNode, { Recipients } from '../index'

const omise = omiseNode({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

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
omise.recipients.create(recipientBody, (err, resp: Recipients.IRecipient) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

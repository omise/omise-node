'use strict';

const omise = require('../index')({
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY,
});

const recipientBody = {
  name: 'Recipient name',
  email: 'recipient@example.com',
  type: 'individual',
  bank_account: {
    bank_code: 'bbl',
    number: '123456789',
    name: 'Reci Pient',
  },
};
omise.recipients.create(recipientBody, (err, resp) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

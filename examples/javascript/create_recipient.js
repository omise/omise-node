'use strict';

const omise = require('./index');

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

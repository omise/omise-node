import omise = require('../index');

let cardDetails: omise.Tokens.IRequest;
cardDetails = {
  card: {
    city: 'Bangkok',
    expiration_month: 2,
    expiration_year: 2017,
    name: 'JOHN DOE',
    number: '4242424242424242',
    postal_code: '10320',
    security_code: '130',
  },
};

const omiseStatic = omise({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

omiseStatic.tokens.create(cardDetails).then((token) => {
  return omiseStatic.customers.create({
    card: token.id,
    description: 'John Doe (id: 30)',
    email: 'john.doe@example.com',
  });
}).then((customer) => {
  return omiseStatic.charges.create({
    amount: 10000,
    currency: 'thb',
    customer: customer.id,
  });
}).then((charge) => {
  console.log(charge);
}).error((err) => {
  console.log(err);
});

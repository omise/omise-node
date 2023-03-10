import omiseNode = require('../index');

const cardDetails = {
  card: {
    name: 'John Doe',
    city: 'Bangkok',
    postal_code: '10320',
    number: '4242424242424242',
    security_code: '123',
    expiration_month: '8',
    expiration_year: '2019',
  },
};

const omise = omiseNode({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

omise.tokens.create(cardDetails).then((token: omiseNode.Tokens.IToken) => {
  console.log(token);
});

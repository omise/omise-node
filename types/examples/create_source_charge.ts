import omiseNode = require('../index');

const amount = 500000;
const currency = 'thb';

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

const source = {
  type:     'internet_banking_bbl',
  amount:   500000,
  currency: 'thb',
};

omise.sources.create(source).then((resSource) => {
    return omise.charges.create({
      amount,
      // Use responded source's ID as a charge's parameter
      source: resSource.id,
      currency,
      return_uri: 'https://omise.co',
    });
  }).then((charge) => {
    console.log(charge);
  });

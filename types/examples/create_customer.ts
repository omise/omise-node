import omiseNode = require('../index');

const omise = omiseNode({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

const customer = {
  description: 'John Doe (id: 30)',
  email: 'john.doe@example.com',
};

omise.customers.create(customer, (err, resp) => {
  console.log(resp);
});

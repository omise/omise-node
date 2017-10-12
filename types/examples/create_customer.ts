import {omise as omiseNode} from "../index";

const omise = omiseNode({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
});

const customer = {
  email: 'john.doe@example.com',
  description: 'John Doe (id: 30)'
};

omise.customers.create(customer, function(err, resp) {
  console.log(resp);
});

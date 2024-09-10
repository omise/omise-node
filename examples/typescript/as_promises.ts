import { Charges, Customers, Tokens } from "../../types";
import omise from "./index";

const cardDetails:Tokens.IRequest = {
  card: {
    city: 'Bangkok',
    expiration_month: 2,
    expiration_year: 2027,
    name: 'JOHN DOE',
    number: '4242424242424242',
    postal_code: '10320',
    security_code: '130',
  },
};

omise.tokens.create(cardDetails).then((token: Tokens.IToken) => {
  return omise.customers.create({
    card: token.id,
    description: 'John Doe (id: 30)',
    email: 'john.doe@example.com',
  });
}).then((customer: Customers.ICustomer) => {
  return omise.charges.create({
    amount: 10000,
    currency: 'thb',
    customer: customer.id,
  });
}).then((charge: Charges.ICharge) => {
  console.log(charge);
}).catch((err: Error | null) => {
  console.log(err);
});

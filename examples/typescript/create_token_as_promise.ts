import omise from "./index";
import { Tokens } from "../../types";

const cardDetails = {
  card: {
    name: 'John Doe',
    city: 'Bangkok',
    postal_code: '10320',
    number: '4242424242424242',
    security_code: '123',
    expiration_month: '8',
    expiration_year: '2029',
  },
};

omise.tokens
  .create(cardDetails)
  .then((token: Tokens.IToken) => {
    console.log(token);
  })
  .catch((err: Error | null) => {
    console.log(err);
  });

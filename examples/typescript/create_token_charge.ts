import omise from "./index";
import { Charges, Tokens } from "../../types";

const cardDetails = {
  card: {
    name: "Gaurav",
    number: "4242424242424242",
    expiration_month: 2,
    expiration_year: 2025,
    security_code: "123",
  },
};

omise.tokens.create(cardDetails, (err: Error | null, token: Tokens.IToken) => {
  if (err) {
    console.log("Token error", err);
    return;
  }

  omise.charges.create(
    {
      amount: 100000,
      currency: "thb",
      return_uri: "http://example.com",
      card: token.id,
    },
    function (err: Error | null, charge: Charges.ICharge) {
      if (err) {
        console.log("Charge error", err);
        return;
      }

      console.log("charge", charge);
    }
  );
});

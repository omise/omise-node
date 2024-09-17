import omise from "./index";
import { Charges, Sources } from "../../types";

const amount = 500000;
const currency = 'thb';

const source = {
  type:     'internet_banking_bbl',
  amount:   500000,
  currency: 'thb',
};

omise.sources.create(source).then((resSource: Sources.ISource) => {
    return omise.charges.create({
      amount,
      // Use responded source's ID as a charge's parameter
      source: resSource.id,
      currency,
      return_uri: 'https://omise.co',
    });
  }).then((charge: Charges.ICharge) => {
    console.log(charge);
  });

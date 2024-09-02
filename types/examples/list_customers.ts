import omise from "./index";
import { Customers } from "../index";

omise.customers.list({}, (err: Error | null, resp: Customers.ICustomerList) => {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

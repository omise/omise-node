import omise from "./index";
import { Customers } from "../../types";

omise.customers.list({}, (err: Error | null, resp: Customers.ICustomerList) => {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

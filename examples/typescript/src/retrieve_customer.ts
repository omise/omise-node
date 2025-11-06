import omise from "./index";
import { Customers } from "omise";

omise.customers.retrieve(
  "cust_60dw2h7vc8pwuiy9hag",
  (err: Error | null, resp: Customers.ICustomer) => {
    if (err) {
      console.log(err);
    }
    console.log(resp);
  }
);

import omise from "./index";
import { Customers } from "omise";

const updateParams = {description: 'the other description'};

omise.customers.update('cust_60dw2h7vc8pwuiy9hag', updateParams,
  (err: Error | null, resp: Customers.ICustomer) => {
    console.log(resp);
  });

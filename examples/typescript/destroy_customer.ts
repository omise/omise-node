import omise from "./index";
import { Customers } from "../../types";

omise.customers.destroy(
  "cust_60458v5p9fhyx3z4yp7",
  (err: Error | null, resp: Customers.ICustomer) => {
    if (err) {
      console.log(err);
    }
    console.log(resp);
  }
);

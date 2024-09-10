import omise from "./index";
import { Customers } from "../../types";

const customer = {
  description: 'John Doe (id: 30)',
  email: 'john.doe@example.com',
};

omise.customers.create(customer, (err: Error | null, resp: Customers.ICustomerList) => {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

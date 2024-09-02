import omise from "./index";
import { Charges } from "../index";

omise.charges.list(
  { limit: 2 },
  (err: Error | null, resp: Charges.IChargeList) => {
    if (err) {
      console.log(err);
    }
    console.log(resp)
  }
);

import omise from "./index";
import { Charges } from "../../types";

omise.charges.list(
  { limit: 2 },
  (err: Error | null, resp: Charges.IChargeList) => {
    if (err) {
      console.log(err);
    }
    console.log(resp)
  }
);

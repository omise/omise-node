import omise from "./index";
import { Cards } from "../../types";

omise.customers.listCards(
  "cust_60dw2h7vc8pwuiy9hag",
  { order: "reverse_chronological" },
  (err: Error | null, resp: Cards.ICardList) => {
    if (err) {
      console.log(err);
    }
    console.log(resp);
  }
);

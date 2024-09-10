import omise from "./index";
import { Links } from "../../types";

const link = {
  amount: 19000,
  currency: "thb",
  multiple: true,
  title: "Cappuccino",
  description: "Freshly brewed coffee",
};

omise.links.create(link, (err: Error | null, resp: Links.ILinkListResponse) => {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

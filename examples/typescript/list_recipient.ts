import omise from "./index";
import { Recipients } from "../../types";

omise.recipients.list({limit: 5}, (err: Error | null, resp: Recipients.IRecipientList) => {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

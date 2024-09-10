import omise from "./index";
import { Transfers } from "../../types";

const reqBody: Transfers.IRequest = {
  amount: 40000,
  recipient: 'recp_60vh0g90jhbsg9afu5c',
  fail_fast: true
};

omise.transfers.create(reqBody, (err: Error | null, resp: Transfers.ITransfer) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

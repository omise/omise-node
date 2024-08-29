import omiseNode, { Transfers } from '../index'

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

const reqBody: Transfers.IRequest = {
  amount: 40000,
  recipient: 'recp_60w95drhxsfzbkr89c4',
  fail_fast: true
};

omise.transfers.create(reqBody, (err, resp: Transfers.ITransfer) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

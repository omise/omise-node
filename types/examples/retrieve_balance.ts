import omiseNode, { Balance } from '../index'

const omise = omiseNode({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

omise.balance.retrieve((err, resp: Balance.IBalance) => {
  if (err) {
    console.log(err)
  }
  console.log(resp);
});

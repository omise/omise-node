
import * as dotenv from 'dotenv';
dotenv.config();

import omiseNode from '../../index'

const omise = omiseNode({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  host: process.env.OMISE_NODE_HOST,
});

export default omise

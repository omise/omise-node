const dotenv = require("dotenv");
dotenv.config();

const omise = require("../../index")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  host: process.env.OMISE_NODE_HOST,
});

module.exports = omise;

import {omise as omiseNode} from "../index";

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY
});

omise.customers.list(function(err, resp) {
    console.log(resp);
});

import omiseNode = require('../index');

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

omise.charges.list({limit: 2}, (err, resp) => {
    console.log(resp);
});

import omiseNode = require('../index');

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

omise.customers.retrieve('cust_test_4z33o46lqreryhqua8w', (err, resp) => {
    console.log(resp);
});

import omiseNode = require('../index');

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

omise.customers.listCards('cust_test_53reuowpjglur236wm7',
  {order: 'reverse_chronological'},
    (e, resp) => {
        console.log(resp);
    });

import omiseNode = require('../index');

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

const link = {
    amount: 19000,
    currency: 'thb',
    multiple: true,
    title: 'Cappuccino',
    description: 'Freshly brewed coffee',
};

omise.links.create(link, (err, resp) => {
    console.log(resp);
});

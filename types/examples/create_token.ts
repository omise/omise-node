import omiseNode = require('../index');

const omise = omiseNode({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
});

const cardDetails = {
    card: {
        name: 'JOHN DOE',
        city: 'Bangkok',
        postal_code: 10320,
        number: '4242424242424242',
        expiration_month: 2,
        expiration_year: 2017,
        security_code: '123',
    },
};

omise.tokens.create(cardDetails, (err, token) => {
    if (err) {
        console.log('error', err);
        return;
    }

    omise.charges.create({
        amount: 10000,
        currency: 'thb',
        return_uri: 'http://example.com',
        card: token.id,
    }, function(err, charge) {
        if (err) {
            console.log('error', err);
            return;
        }

        console.log('charge', charge);
    })
});

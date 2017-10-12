import * as Omise from 'omise';

const omise = Omise({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY
});

const cardDetails = {
    card: {
        'name': 'JOHN DOE',
        'city': 'Bangkok',
        'postal_code': 10320,
        'number': '4242424242424242',
        'expiration_month': 2,
        'expiration_year': 2017
    }
};

omise.tokens.create(cardDetails, function(err, resp) {
    console.log(resp);
});

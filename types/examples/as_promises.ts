import {omise} from "../index";

const cardDetails = {
    card: {
        name: 'JOHN DOE',
        city: 'Bangkok',
        postal_code: '10320',
        number: '4242424242424242',
        expiration_month: 2,
        expiration_year: 2017,
        security_code: '130'
    },
};

const omiseStatic = omise({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY
});

omiseStatic.tokens.create(cardDetails).then(function(token) {
    console.log(token);
    return omiseStatic.customers.create({
        email: 'john.doe@example.com',
        description: 'John Doe (id: 30)',
        card: token.id,
    });
}).then(function(customer) {
    console.log(customer);
    return omiseStatic.charges.create({
        amount: 10000,
        currency: 'thb',
        customer: customer.id,
    });
}).then(function(charge) {
    console.log(charge);
}).error(function(err) {
    console.log(err);
});

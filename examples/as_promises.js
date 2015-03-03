var config = {
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY
};

var omise = require('omise-node')(config);
var card_details = {
       'card[name]': 'JOHN DOE',
       'card[city]': 'Bangkok',
       'card[postal_code]': 10320,
       'card[number]': '4242424242424242',
       'card[expiration_month]': 2,
       'card[expiration_year]': 2017
};
omise.tokens.create(card_details)
.then(function(token){
  omise.customers.create({
    email: "john.doe@example.com",
    description: "John Doe (id: 30)",
    card: token.id
  }).then(function(customer) {
    return omise.charges.create({
      amount: 5555,
      currency: 'thb',
      customer: customer.id
    });
  }).then(function(charge) {
    console.log(charge);
  }, function(err) {
    console.log('error: ' + err.message);
  });
});

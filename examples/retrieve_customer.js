var config = {
    'publicKey': 'pkey_test_4yyg6ko1yl82hlh1hmt',
    'secretKey': 'skey_test_4yyg6l9b9lbcjknr418'
};

var omise = require('omise-node')(config);

//create token
// var card_details = {
//       'card[name]': 'JOHN DOE',
//       'card[city]': 'Bangkok',
//       'card[postal_code]': 10320,
//       'card[number]': '4242424242424242',
//       'card[expiration_month]': 2,
//       'card[expiration_year]': 2017
//   };
//
// omise.tokens.create(card_details, function(err, resp){
//       console.log(resp);
// });


//create customer
//var customer = {
  //email: "john.doe@example.com",
  //description: "John Doe (id: 30)",
//};

//omise.customers.create(customer, function(err, resp) {
  //console.log(resp);
//});

//list customers
//omise.customers.list(function(err, resp) {
  //console.log(resp);
//});


omise.customers.retrieve("cust_test_4z33o46lqreryhqua8w", function(err, resp) {
  console.log(resp);
});

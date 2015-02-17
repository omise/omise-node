omise-node
=========

Omise Node.js client

**Installation**
```
$npm install omise-node
```

**Usage**

 - Configure
```
var config = {
  'publicKey': '<Public key>,
  'secretKey': '<Secret key>'
};

var omise = require('omise-node')(config);
```

 - Create token

```
var card_details = {
  'card[name]': 'JOHN DOE',
  'card[city]': 'Bangkok',
  'card[postal_code]': 10320,
  'card[number]': '4242424242424242',
  'card[expiration_month]': 2,
  'card[expiration_year]': 2017
};

omise.tokens.create(card_details, function(err, resp){
  var token_id = resp.card.id;
  console.log(token_id);
});
```

- Add a customer with a card via a token

```
  var customer = {
    email: "john.doe@example.com",
    description: "John Doe (id: 30)",
    card: <token_id>
  };
  omise.customers.create(customer, function(err, resp) {});
```

- Add a new customer

```
var omise = require('../index')(config);
var customer = {
  email: "john.doe@example.com",
  description: "John Doe (id: 30)",
};
omise.customers.create(customer, function(err, resp) {});
````


**Testing**
```
$export OMISE_PUBLIC_KEY=<test public key>
$export OMISE_SECRET_KEY=<test secret key>
$cd omise-node;
$mocha test #for local test
$NOCK_OFF=true mocha test #for remote test
```

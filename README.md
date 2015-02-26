omise-node
=========

Omise Node.js client

##Installation
```
$npm install omise-node
```

* tested with node version 0.10.32+

## Configuration

```
var config = {
  'publicKey': '<Public key>',
  'secretKey': '<Secret key>'
};

var omise = require('omise-node')(config);
```


## Overview and examples

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
var customer = {
  email: "john.doe@example.com",
  description: "John Doe (id: 30)",
};
omise.customers.create(customer, function(err, resp) {});
```

- List all customers

```
omise.customers.list(function{err, resp} {});
```

- Retrieve a customer

```
omise.customers.retrieve(customerId, function{err, resp} {});
```


- Updating a Customer

```
omise.customers.update(customerId, {
  description: "Customer for john.doe@example.com"
}, function(err, customer) {
});
```

### Available resources and related methods

Check [https://docs.omise.co](https://docs.omise.co) for more details

 * account
  * `retrieve()`
 * balance
  * `retrieve()`
 * charges
  * `create(data)`
  * `list()`
  * `retrieve(chargeId)`
  * `capture(chargeId)`
  * `refund(chargeId)`
  * `update(chargeId[, data])`
 * customers
  * `create(data)`
  * `list()`
  * `update(customerId[, data])`
  * `destroy(customerId)`
  * `retrieve(customerId)`
  * `listCards(customerId)`
  * `retrieveCard(customerId, cardId)`
  * `updateCard(customerId, cardId[, data])`
  * `destroyCard(customerId, cardId)`
 * tokens
  * `create(data)`
  * `retrieve(tokenId)`
 * transfers
  * `create(data)`
  * `list()`
  * `retrieve(transferId)`
  * `update(transferId[, data])`
 * transactions
  * `list()`
  * `retrieve(transactionId)`

Note: where `data` is a Javascript object, `{'amount': '4000'}` for instance.

**Testing**
```
$export OMISE_PUBLIC_KEY=<test public key>
$export OMISE_SECRET_KEY=<test secret key>
$cd omise-node;
$mocha test #for local test
$NOCK_OFF=true mocha test #for remote test

```

**Code Style**
You could use git pre-commit hook to check.
Just run `ln -s ../../pre-commit.sh .git/hooks/pre-commit`

**Contribute**

If you want to add a new resource, just creating new resource file in `lib/<resource>.js` and add a content like following:

```
var resource = require('../apiResources');
var <resource> = function(config) {
  return resource.resourceActions('<resource>',
    [<array of actions>], {'key': config['<key to use>']}
  );
}
module.exports = <resource>;
```
and append omiseResources in lib/apiResources.js with a new resourceName('<resource>')

Note:
Support actions: `['create', 'list', 'retrieve', 'destroy', 'update']`
And don't for to add a test, to do so, setup mocking at `test/mocks/<resource>_<action>.js` and create relevant test in test/ directory.

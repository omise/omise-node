omise-node
==========

Omise Node.js bindings.

## Installation

```
$ npm install omise-node
```

The library has been tested with Node version 0.10.32+.

## Usage

First, you have to configure the library by passing the public key and secret key from `https://dashboard.omise.co/` to `omise-node` export, for example:

```
var omise = require('omise-node')({
  'publicKey': 'pkey_test_...',
  'secretKey': 'skey_test_...'
});
```

Please see [Omise Documentation](https://docs.omise.co/) for more information on how to use the library.

## Examples

### Creating a token

Token can be created by using `omise.tokens.create`, for example (passing callback):

```
var cardDetails = {
  card: {
    'name': 'JOHN DOE',
    'city': 'Bangkok',
    'postal_code': 10320,
    'number': '4242424242424242',
    'expiration_month': 2,
    'expiration_year': 2017
  }
};

omise.tokens.create(cardDetails, function(err, token){
  var tokenId = token.id;
  console.log(tokenId);
});
```

Please note that token creation this way **must not** be done in the production environment unless you have a very good reason to do so.

### Create a customer with card associated to it

Creating a customer could be done by using `omise.customers.create` which accept optional `card` argument. When you pass in a `tokenId` retrieve from `omise.tokens` or [Omise.js](https://docs.omise.co/omise-js/), the card associated to that token will be associated to the customer.

```
var customer = {
  'email': "john.doe@example.com",
  'description': "John Doe (id: 30)",
  'card': tokenId
};

omise.customers.create(customer, function(err, customer) {
  var customerId = customer.id;
  console.log(customerId);
});
```

### List all customers

After customers are created, you can list them with `customer.customers.list` and passing a callback to it. The object returned from a list API will be a `list` object, which you can access the raw data via `data` attribute:

```
omise.customers.list(function(err, list) {
  console.log(list.data);
});
```

### Retrieve a customer

You can retrieve a created customer by using `omise.customers.retrieve` and passing a customer ID to it, e.g.

```
omise.customers.retrieve(customerId, function(err, resp) {
  console.log(resp.description);
});
```

### Updating a Customer

The same with customer updating, which could be done using `omise.customers.update` with a customer ID and an object containing changes:

```
var changes = {
  description: "Customer for john.doe@example.com"
}

omise.customers.update(customerId, changes, function(err, resp) {
  console.log(resp.description);
});
```

## Promise support

The library also supports the Promise/A+ interface that shares the same API method as the callback one, for example:

```
var cardDetails = {
  card: {
    'name': 'JOHN DOE',
    'city': 'Bangkok',
    'postal_code': 10320,
    'number': '4242424242424242',
    'expiration_month': 2,
    'expiration_year': 2017
  }
};

// First, we start creating a token with `omise.tokens.create` to store the card data.
omise.tokens.create(cardDetails).then(function(token) {

  // Then, create a customer using token returned the API.
  console.log(token.id);
  return omise.customers.create({
    email: "john.doe@example.com",
    description: "John Doe (id: 30)",
    card: token.id
  });

}).then(function(customer) {

  // And we make a charge to actually charge the customer for something.
  console.log(customer.id);
  return omise.charges.create({
    amount: 10000,
    currency: 'thb',
    customer: customer.id
  });

}).then(function(charge) {

  // This function will be called after a charge is created.

}).error(function(err) {

  // Put error handling code here.

}).done();
```

### Resource methods

The following API methods are available. Please see [https://docs.omise.co](https://docs.omise.co) for more details.

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

## Testing

There are two modes of testing, to test without connecting to remote API server:

```
$ cd omise-node
$ mocha test
```

If you want to test by connecting to actual API server, you must first obtain a public and secret keys and export it:

```
$ export OMISE_PUBLIC_KEY=<test public key>
$ export OMISE_SECRET_KEY=<test secret key>
$ cd omise-node
$ NOCK_OFF=true mocha test
```

## Contributions

Before submitting a pull request, please run jscs to verify coding styles and ensure all test passed:

```
$ npm run jscs
$ npm test
```

You could use also use a git pre-commit hook to do this automatically by aliasing the `pre-commit.sh` to Git pre-commit hook:

```
ln -s ../../pre-commit.sh .git/hooks/pre-commit
```

### Adding new resources

Resources are handled via `apiResource`. Adding new resource could be done by creating a new resource file as `lib/resourceName.js` with the following content:

```
var resource = require('../apiResources');
var resourceName = function(config) {
  return resource.resourceActions(
    'resourceName',
    ['create', 'list', 'retrieve', 'destroy', 'update'],
    {'key': config['secretKey']}
  );
}

module.exports = resourceName;
```

Then register the newly created resource to `lib/apiResources.js` as e.g. `resourceName('resourceName')`. Pre-built actions are: create, list, retrieve, destroy and update.

### Requests mocking

Request mocks are stored as `test/mocks/<resource>_<action>.js`.

omise-node
==========

Please contact [support@omise.co](support@omise.co) if you have any question regarding this library and the functionality it provides.

Omise Node.js bindings.

## Installation

From NPM

```
$ npm install omise
```

The library has been tested with Node version 4.4.6.

## Code Status

[![Build Status](https://circleci.com/gh/omise/omise-node.svg?style=svg)](https://circleci.com/gh/omise/omise-node)
[![Code Climate](https://codeclimate.com/github/omise/omise-node/badges/gpa.svg)](https://codeclimate.com/github/omise/omise-node)

## Usage

### Flow

1. User enters the credit card information on your website or application using a form.
2. The card information is sent via HTTPS directly from the client to Omise Servers using Omise.js, Card.js or Omise-iOS SDK.
3. If the card passes the authorization, then your frontend will send the token to `omise-node` backend to finally capture the charge with Omise-node.

### The code

After you have implemented `Omise.js` on your frontend.
Then you can charge the card by passing the token ( if `card.security_code_check` is true ) to `omise-node` backend.

In order to implement `omise-node` as your backend code.
First, you have to configure the library by passing the secret key from `https://dashboard.omise.co/` to `omise` export, for example:

```javascript
var omise = require('omise')({
  'secretKey': 'skey_test_...',
  'omiseVersion': '2015-09-10'
});
omise.charges.create({
  'description': 'Charge for order ID: 888',
  'amount': '100000', // 1,000 Baht
  'currency': 'thb',
  'capture': false,
  'card': tokenId
}, function(err, resp) {
  if (resp.paid) {
    //Success
  } else {
    //Handle failure
    throw resp.failure_code;
  }
});
```

Please see [Omise Documentation](https://www.omise.co/docs) for more information on how to use the library.

### Important Note:

**Full Credit Card data should never touch or go through your servers. That means, Do not send the credit card data to Omise from your servers directly.**

The token creation method in the library should only be used either with fake data in test mode (e.g.: quickly creating some fake data, testing our API from a terminal, etc.), or if you do and you are PCI-DSS compliant, sending card data from server requires a valid PCI-DSS certification.
that said, you must achieve, maintain PCI compliance at all times and do following a [Security Best Practices](https://www.pcisecuritystandards.org/documents/PCI_DSS_V3.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf)

So, we recommended you to create a token using [Omise.JS](https://github.com/omise/omise.js) library which runs on browser.
It uses Javascript to send the credit card data on client side, send it to Omise, and then you can populate the form with a unique one-time used token which can be used later on with `omise-node` or [Card.js](https://www.omise.co/card-js-api), by using it you can let it builds a credit card payment form window and creates a card token that you can use to create a charge with `omise-node`.
For both methods, the client will directly send the card information to Omise gateway, your servers don't have to deal with card information at all and you don't need to deal with credit card data hassle, it reduces risk.

**Please read https://www.omise.co/collecting-card-information/ regarding how to collecting card information.**

## Examples

### Create a customer with card associated to it

Creating a customer can be done by using `omise.customers.create` which accepts an optional `card` argument. When you pass in a `tokenId` retrieve from [Omise.js](https://www.omise.co/omise-js/), the card associated to that token will be associated to the customer.

```javascript
omise.customers.create({
  'email': 'john.doe@example.com',
  'description': 'John Doe (id: 30)',
  'card': 'tokn_test_4xs9408a642a1htto8z' //tokenId
}, function(err, customer) {
  var customerId = customer.id;
  console.log(customerId);
});
```

### List all customers

After customers are created, you can list them with `customer.customers.list` and passing a callback to it. The object returned from a list API will be a `list` object, which you can access the raw data via `data` attribute:

```javascript
omise.customers.list(function(err, list) {
  console.log(list.data);
});
```

### Retrieve a customer

You can retrieve the created customer by using `omise.customers.retrieve` and passing a customer ID to it, e.g.

```javascript
omise.customers.retrieve(customerId, function(err, resp) {
  console.log(resp.description);
});
```

### Updating a Customer

The same with customer updating, which could be done using `omise.customers.update` with a customer ID and an object containing changes:

```javascript
omise.customers.update(customerId, {
  description: 'Customer for john.doe@example.com'
}, function(err, resp) {
  console.log(resp.description);
});
```

## Promise support

The library also supports the Promise/A+ interface that shares the same API method as the callback one, for example:

```javascript
omise.tokens.retrieve('tokn_test_4xs9408a642a1htto8z', function(error, token) {
  return omise.customers.create({
    email: 'john.doe@example.com',
    description: 'John Doe (id: 30)',
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

## Error Handling

To handle an invalid request, it is required to check any error via an `Error` object
that includes `code` and `message` attributes as stated in https://www.omise.co/api/errors.
But, for any valid request, checking `failure_code` and `failure_message` is required, for example:
If you'd like to create a `Charge` or a `Transfer` with a valid request,
A sucessfully charge or tranfer happens only when none of failure exists that means both `failure_code` and `failure_message` must be `null`.

## Resource methods

The following API methods are available. Please see [https://www.omise.co/docs](https://www.omise.co/docs) for more details.

* account
  * `retrieve()`
  * `update(data)`
* balance
  * `retrieve()`
* charges
  * `create(data)`
  * `list([data])`
  * `retrieve(chargeId)`
  * `capture(chargeId)`
  * `createRefund(chargeId[, data])`
  * `update(chargeId[, data])`
  * `reverse(chargeId)`
  * `expire(chargeId)`
  * `schedules([data])`
* customers
  * `create(data)`
  * `list([data])`
  * `update(customerId[, data])`
  * `destroy(customerId)`
  * `retrieve(customerId)`
  * `listCards(customerId[, data])`
  * `retrieveCard(customerId, cardId)`
  * `updateCard(customerId, cardId[, data])`
  * `destroyCard(customerId, cardId)`
* tokens
  * `create(data)`
  * `retrieve(tokenId)`
* transfers
  * `create(data)`
  * `list([data])`
  * `retrieve(transferId)`
  * `update(transferId[, data])`
  * `schedules([data])`
* transactions
  * `list([data])`
  * `retrieve(transactionId)`
* disputes
  * `list([data])`
  * `listClosed()`
  * `listOpen()`
  * `listPending()`
  * `retrieve(disputeId)`
  * `update(disputeId[, data])`
* recipients
  * `create(data)`
  * `list([data])`
  * `update(recipientId[, data])`
  * `destroy(recipientId)`
  * `retrieve(recipientId)`
* events
  * `list([data])`
  * `retrieve(eventId)`
* links
  * `create(data)`
  * `list([data])`
  * `retrieve(linkId)`
* sources
  * `create(data)`
* schedules
  * `create(data)`
  * `destroy(scheduleId)`
  * `retrieve([scheduleId])`
* search
  * `list(data)`

## Testing

There are two modes of testing, to test without connecting to remote API server:

```console
$ npm test
```

If you want to test by connecting to actual API server, you must first obtain a public and secret keys and export it:

```console
$ export OMISE_PUBLIC_KEY=<test public key>
$ export OMISE_SECRET_KEY=<test secret key>
$ NOCK_OFF=true npm test
```

## Contributions

Before submitting a pull request, please run jscs to verify coding styles and ensure all test passed:

```console
$ npm run jscs
$ npm test
```

You could use also use a git pre-commit hook to do this automatically by aliasing the `pre-commit.sh` to Git pre-commit hook:

```
ln -s ./pre-commit.sh .git/hooks/pre-commit
```

### Adding new resources

Resources are handled via `apiResource`. Adding new resource could be done by creating a new resource file as `lib/resourceName.js` with the following content:

```javascript
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

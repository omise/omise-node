omise-node
==========

Please contact [support@opn.ooo](support@opn.ooo) if you have any question regarding this library and the functionality it provides.

Omise Node.js bindings.

## Installation

From NPM

```
$ npm install omise
```

The library has been tested with Node version 4.4.6.

## Code Status

[![Node.js CI](https://github.com/omise/omise-node/actions/workflows/ci.yml/badge.svg)](https://github.com/omise/omise-node/actions/workflows/ci.yml)
[![Code Climate](https://codeclimate.com/github/omise/omise-node/badges/gpa.svg)](https://codeclimate.com/github/omise/omise-node)

## Usage

### Flow

1. User enters the credit card information on your website or application using a form.
2. The card information is sent via HTTPS directly from the client to Opn Payment Servers using Omise.js, Card.js or Omise-iOS SDK.
3. If the card passes the authorization, then your frontend will send the token to `omise-node` backend to finally capture the charge with Omise-node.

### The code

After you have implemented `Omise.js` on your frontend.
You can charge the card by passing the token ( if `card.security_code_check` is true ) to `omise-node` backend.

To implement `omise-node` as your backend code.
You have to configure the library by passing the secret key from `https://dashboard.omise.co/` to `omise` export, for example:

```javascript
var omise = require('omise')({
  'secretKey': 'skey_test_...',
  'omiseVersion': '2019-05-29'
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

Please see [Opn Payments Documentation](https://docs.opn.ooo/) for more information on how to use the library.

### Important Note:

**Full Credit Card data should never touch or go through your servers. That means, do not send credit card data to Opn Payments from your servers directly unless you are PCI-DSS compliant.**

The token creation method in the library should only be used either with fake data in test mode (e.g.: quickly creating some fake data, testing our API from a terminal, etc.), or if you are PCI-DSS compliant, send card data from your server.
You must achieve and maintain PCI compliance at all times following [Security Best Practices](https://www.pcisecuritystandards.org/documents/PCI_DSS_V3.0_Best_Practices_for_Maintaining_PCI_DSS_Compliance.pdf)

So, we recommended that you create a token using the `omise.js` library that runs on the browser.
It uses Javascript to send the credit card data on the client side to Opn Payments. You can then populate the form with a unique one-time use token, which can be used later on with `omise-node` or [Omise.js](https://docs.opn.ooo/omise-js). By using this library, you can build a credit card payment form window and create a card token, which you can use to create a charge with `omise-node`.

For both methods, the client will directly send the card information to the Opn Payments gateway; your servers don't have to deal with card information at all. The library reduces the risk of supporting card payments.

**Please read [Collecting card information](https://docs.opn.ooo/collecting-card-information) for an explanation on collecting card information.**

## Examples

### Create a customer with card associated to it

Creating a customer can be done by using `omise.customers.create` that accepts an optional `card` argument. When you pass in a `tokenId` retrieved from omise.js, the card associated to that token will be associated to the customer.

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

After customers are created, you can list them with `customer.customers.list` by passing a callback to it. The object returned from the list API will be a `list` object. You can then access the raw data using the `data` attribute:

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

To update customer information, use `omise.customers.update` and pass a customer ID and an object containing changes:

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

}).catch(function(err) {

  // Put error handling code here.

}).finally();
```

## Error Handling

To handle an invalid request, it is required to check any error using an `Error` object
that includes `code` and `message` attributes as stated in [Errors](https://www.omise.co/api/errors).
However, for any valid request, checking `failure_code` and `failure_message` is required, for example:
If you'd like to create a `Charge` or a `Transfer` with a valid request,
a sucessful charge or tranfer happens only when there are no failutes - that means both `failure_code` and `failure_message` must be `null`.

## Resource methods

The following API methods are available. Please read [Opn Payments documentation](https://docs.opn.ooo/) for details.

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

There are two modes of testing.

To test without connecting to the remote API server:

```console
$ npm test
```

To test by connecting to the actual API server, you must first obtain public and secret keys and export them:

```console
$ export OMISE_PUBLIC_KEY=<test public key>
$ export OMISE_SECRET_KEY=<test secret key>
$ NOCK_OFF=true npm test
```

## Contributions

Before submitting a pull request, please run `jscs` to verify coding styles and ensure that all tests pass:

```console
$ npm run jscs
$ npm test
```

You could use also use a Git pre-commit hook to do this automatically by aliasing `pre-commit.sh` to the Git pre-commit hook:

```
ln -s ./pre-commit.sh .git/hooks/pre-commit
```

### Adding new resources

Resources are handled via `apiResource`. To add a new resource, create a new resource file named `lib/resourceName.js` with the following content:

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

Then register the newly created resource to `lib/apiResources.js` as e.g. `resourceName('resourceName')`. Pre-built actions are: `create`, `list`, `retrieve`, `destroy` and `update`.

### Requests mocking

Request mocks are stored as `test/mocks/<resource>_<action>.js`.

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
    'public_key': 'pkey_test_4yyg6ko1yl82hlh1hmt',
    'secret_key': 'skey_test_5yyg6l9b9lbcjknr418'
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

**Testing**
```
$export OMISE_PUBLIC_KEY=<test public key>
$export OMISE_SECRET_KEY=<test secret key>
$cd omise-node;
$mocha test #for local test
$NOCK_OFF=true mocha test #for remote test
```

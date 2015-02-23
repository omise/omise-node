var config = {
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY
};

var omise = require('omise-node')(config);

//destroy
var customerId = 'cust_test_4yxn6vblxh83h605oxz';
omise.customers.destroy(customerId, function(err, resp) {
  console.log(resp);
});

"use strict";
var config = {
  'publicKey': process.env.OMISE_PUBLIC_KEY,
  'secretKey': process.env.OMISE_SECRET_KEY
};

var omise = require('../index')(config);

var customer = {
  email: "john.doe@example.com",
  description: "John Doe (id: 30)",
  // card: "tokn_test_4z2w04h2a0v4dmf0arl"  //with token
};
omise.customers.create(customer, function(err, resp) {
  console.log(resp);
// { object: 'customer',
//   id: 'cust_test_4z2w0l9oyfk0qnziteu',
//   livemode: false,
//   location: '/customers/cust_test_4z2w0l9oyfk0qnziteu',
//   default_card: 'card_test_4z2w04h14pcui15b0rh',
//   email: 'john.doe@example.com',
//   description: 'John Doe (id: 30)',
//   created: '2015-02-16T15:18:55Z',
//   cards:
//    { object: 'list',
//      from: '1970-01-01T00:00:00+00:00',
//      to: '2015-02-16T15:18:55+00:00',
//      offset: 0,
//      limit: 20,
//      total: 1,
//      data: [ [Object] ],
//      location: '/customers/cust_test_4z2w0l9oyfk0qnziteu/cards' } }
});

"use strict";

const omise = require("./index");

omise.customers.listCards(
  "cust_60dw2h7vc8pwuiy9hag",
  { order: "reverse_chronological" },
  function (err, resp) {
    if (err) {
      console.log(err);
    }
    console.log(resp);
  }
);

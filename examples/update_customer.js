"use strict";

const omise = require("./index");

let updateParams = { description: "the other description" };

omise.customers.update(
  "cust_60dw2h7vc8pwuiy9hag",
  updateParams,
  function (err, resp) {
    console.log(resp);
  }
);

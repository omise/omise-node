//Omise.co
var api = require('./lib/api.js');

module.exports = function (config) {
  api.configure(config || {});
  return {
     tokens: {
         create: function (data, callback) {
             api.post("/tokens", data, callback);
         },
     }
  };
};

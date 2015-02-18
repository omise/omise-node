var util = require("util");
function ApiError() {
  this.message = message;
  this.name = 'ApiError';
}
util.inherits(ApiError, Error)

module.exports = ApiError;

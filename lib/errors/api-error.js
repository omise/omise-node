var util = require('util');
function ApiError(message) {
  this.message = message;
  this.name = 'ApiError';
}
util.inherits(ApiError, Error);

module.exports = ApiError;

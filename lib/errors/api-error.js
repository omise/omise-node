function ApiError(message) {
  var obj = {};

  this.message = message;
  this.name = 'ApiError';

  Error.captureStackTrace(obj, ApiError);
  this.stack = obj.stack;
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

module.exports = ApiError;

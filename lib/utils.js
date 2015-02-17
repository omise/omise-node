'use strict';

/**
 * Merges two objects (a, b) recursively.
 * @param  {Object} object a
 * @param  {Object} object b
 * @return {Object}
 */
var mergeObjects = exports.mergeObjects = function mergeObjects(a, b) {
  var extend = require('util')._extend;
  return extend(a, b);
}

'use strict';

var _ = require('lodash');

/**
 * Function decorator, validates item is a javascript object.
 *
 * @param {Function} fn Underlying function to call.
 * @returns {Function}
 */
function ensureItemIsObject(fn) {
  return function(item) {
    if (_.isPlainObject(item)) {
      return fn(item);
    }
    throw new TypeError('Item must be plain object literal');
  };
}

module.exports = ensureItemIsObject;

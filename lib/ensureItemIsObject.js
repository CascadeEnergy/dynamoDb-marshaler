'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _isPlainObject = require('lodash');

/**
 * Function decorator, validates item is a javascript object.
 *
 * @param {Function} fn Underlying function to call.
 * @returns {Function}
 */
function ensureItemIsObject(fn) {
  return function (item) {
    if (_isPlainObject.isPlainObject(item)) {
      return fn(item);
    }
    throw new TypeError('Item must be plain object literal');
  };
}

exports['default'] = ensureItemIsObject;
module.exports = exports['default'];
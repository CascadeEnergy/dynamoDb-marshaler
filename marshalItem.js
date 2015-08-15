'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _ensureItemIsObject = require('./lib/ensureItemIsObject');

var _ensureItemIsObject2 = _interopRequireDefault(_ensureItemIsObject);

var _marshal = require('./marshal');

var _marshal2 = _interopRequireDefault(_marshal);

/**
 * Translates a javascript object into a format ready for DynamoDb.
 *
 * @param {Object} item Plain javascript object.
 * @returns {Object} The marshaled dynamoDb item.
 */
function marshalItem(item) {
  return _marshal2['default'](item).M;
}

exports['default'] = _ensureItemIsObject2['default'](marshalItem);
module.exports = exports['default'];
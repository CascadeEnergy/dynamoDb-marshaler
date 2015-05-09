'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _unmarshalItem = require('./unmarshalItem');

var _unmarshalItem2 = _interopRequireDefault(_unmarshalItem);

/**
 * Translates a DynamoDb formatted object, into a normally formatted object
 * represented as a JSON string.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {String} JSON representation of a javascript object.
 */
function unmarshalJson(item) {
  return JSON.stringify(_unmarshalItem2['default'](item));
}

exports['default'] = unmarshalJson;
module.exports = exports['default'];
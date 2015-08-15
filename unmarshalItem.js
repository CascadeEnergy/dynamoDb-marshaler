'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _ensureItemIsObject = require('./lib/ensureItemIsObject');

var _ensureItemIsObject2 = _interopRequireDefault(_ensureItemIsObject);

var _unmarshal = require('./unmarshal');

var _unmarshal2 = _interopRequireDefault(_unmarshal);

/**
 * Translates a DynamoDb formatted object (a response from DynamoDb sdk) into
 * a plain javascript object with DynamoDb AttributeValue objects.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {Object} A javascript object in normal form.
 */
function unmarshalItem(item) {
  return _unmarshal2['default']({ M: item });
}

exports['default'] = _ensureItemIsObject2['default'](unmarshalItem);
module.exports = exports['default'];
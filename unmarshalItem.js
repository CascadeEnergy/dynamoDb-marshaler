'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ensureItemIsObject = require('./lib/ensureItemIsObject');

var _ensureItemIsObject2 = _interopRequireDefault(_ensureItemIsObject);

var _toJS = require('./lib/converter');

require('babel/polyfill');

/**
 * Translates a DynamoDb formatted object (a response from DynamoDb sdk) into
 * a plain javascript object with DynamoDb AttributeValue objects.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {Object} A javascript object in normal form.
 */
function unmarshalItem(item) {
  return _toJS.toJS({ M: item });
}

exports['default'] = _ensureItemIsObject2['default'](unmarshalItem);
module.exports = exports['default'];
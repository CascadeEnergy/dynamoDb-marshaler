'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _marshalItem = require('./marshalItem');

var _marshalItem2 = _interopRequireDefault(_marshalItem);

require('babel/polyfill');

/**
 * Translates a JSON string into an object in DynamoDb format.
 *
 * @param {String} json A JSON representation of a javascript object.
 * @returns {Object} The marshaled DynamoDb compliant item.
 */
function marshalJson(json) {
  return _marshalItem2['default'](JSON.parse(json));
}

exports['default'] = marshalJson;
module.exports = exports['default'];
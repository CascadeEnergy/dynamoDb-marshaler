'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _dispatcher = require('./lib/dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _marshalCommandList = require('./lib/commands');

exports['default'] = _dispatcher2['default'].apply(undefined, _toConsumableArray(_marshalCommandList.marshalCommandList));
module.exports = exports['default'];
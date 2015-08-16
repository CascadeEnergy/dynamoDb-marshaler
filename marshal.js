'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _dispatch = require('dispatch-recursive');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _marshalCommandList = require('./lib/commands');

exports['default'] = _dispatch2['default'].apply(undefined, _toConsumableArray(_marshalCommandList.marshalCommandList));
module.exports = exports['default'];
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ensureItemIsObject = require('./lib/ensureItemIsObject');

var _ensureItemIsObject2 = _interopRequireDefault(_ensureItemIsObject);

var _toDDB = require('./lib/converter');

require('babel/polyfill');

function marshalItem(item) {
  var marshaledItem = _toDDB.toDDB(item);
  return marshaledItem.M;
}

exports['default'] = _ensureItemIsObject2['default'](marshalItem);
module.exports = exports['default'];
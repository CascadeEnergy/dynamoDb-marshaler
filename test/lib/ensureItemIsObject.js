'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ensureItemIsObject = require('../../lib/ensureItemIsObject');

var _ensureItemIsObject2 = _interopRequireDefault(_ensureItemIsObject);

describe('ensureItemIsObject', function () {
  it('should return a function', function () {
    _assert2['default'].ok(typeof _ensureItemIsObject2['default']() === 'function');
  });

  it('should forward to underlying function if item is an object', function () {
    var spy = _sinon2['default'].spy();
    var item = {};
    _ensureItemIsObject2['default'](spy)(item);
    _assert2['default'](spy.calledOnce);
    _assert2['default'].equal(spy.args[0][0], item);
  });

  it('should throw a TypeError if item is not an object', function () {
    function harness() {
      _ensureItemIsObject2['default'](function () {})('not.object');
    }

    _assert2['default'].throws(harness, /Item must be plain object literal/);
  });
});
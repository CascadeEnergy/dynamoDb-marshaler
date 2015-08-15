'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _isUndefined = require('lodash/lang/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

/**
 * Recursive dispatcher, returns a function which iterates a series of commands
 * looking for one to handle the target and return a value. If the target
 * cannot be handled by a command the command returns undefined. If none of the
 * supplied commands handle the target, an error is thrown.
 *
 * @param commands
 * @returns {Function}
 */
function dispatcher() {
  for (var _len = arguments.length, commands = Array(_len), _key = 0; _key < _len; _key++) {
    commands[_key] = arguments[_key];
  }

  return function dispatch(target) {
    var result = undefined;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(commands), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var command = _step.value;

        result = command(target, dispatch);

        if (!_isUndefined2['default'](result)) {
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (_isUndefined2['default'](result)) {
      throw new TypeError('Encountered unexpected target');
    }

    return result;
  };
}

exports['default'] = dispatcher;
module.exports = exports['default'];
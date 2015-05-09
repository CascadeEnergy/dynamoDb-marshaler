'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

/**
 * Uses the chain of command pattern to select the marshaling algorithm.
 * Once a command marshals the item it is assigned to the return data and
 * no further commands are called.
 *
 * Each command is passed a reference to this marshal function as well because
 * in the case of the "M" (Map) and "L" (List) DynamoDb types their subvalues
 * also need to be marshaled.
 *
 * input: {foo: 'bar'}
 * output: {M: {foo: {S: 'bar'}}}
 *
 * @param {*} item A value to marshal.
 * @returns {Object} A DynamoDb AttributeValue object.
 */
exports.toDDB = toDDB;

/**
 * Uses the chain of command pattern to select the unmarshaling algorithm to
 * use for the given AttributeValue object based on the type key. Once a
 * command handles the item, no further commands are called and the unmarshaled
 * data is returned.
 *
 * input: {M: {foo: {S: 'bar'}}}
 * output: {foo: 'bar'}
 *
 * @param {Object} item A DynamoDb formatted AttributeValue object.
 * @returns {*} Unmarshaled value.
 */
exports.toJS = toJS;

var _isUndefined = require('lodash');

var _unmarshalCommandList$marshalCommandList = require('./commands');

function toDDB(item) {
  var result = undefined;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(_unmarshalCommandList$marshalCommandList.marshalCommandList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var command = _step.value;

      result = command(item, toDDB);

      if (!_isUndefined.isUndefined(result)) {
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

  if (_isUndefined.isUndefined(result)) {
    throw new TypeError('Marshaling error: encountered unexpected item ' + item);
  }

  return _Object$assign({}, result);
}

function toJS(item) {
  var unmarshaledItem = undefined;

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(_unmarshalCommandList$marshalCommandList.unmarshalCommandList), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var command = _step2.value;

      unmarshaledItem = command(item, toJS);

      if (!_isUndefined.isUndefined(unmarshaledItem)) {
        break;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if (_isUndefined.isUndefined(unmarshaledItem)) {
    throw new TypeError('Unmarshal error: encountered unexpected item ' + item);
  }

  return unmarshaledItem;
}

exports['default'] = { toDDB: toDDB, toJS: toJS };
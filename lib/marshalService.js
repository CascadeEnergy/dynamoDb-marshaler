'use strict';

var _ = require('lodash');

// Marshal commands
var marshalString = require('./commands/marshalString');
var marshalNumber = require('./commands/marshalNumber');
var marshalBoolean = require('./commands/marshalBoolean');
var marshalNull = require('./commands/marshalNull');
var marshalStringSet = require('./commands/marshalStringSet');
var marshalNumberSet = require('./commands/marshalNumberSet');
var marshalList = require('./commands/marshalList');
var marshalMap = require('./commands/marshalMap');

// Unmarshal commands
var unmarshalPassThrough = require('./commands/unmarshalPassThrough');
var unmarshalNumber = require('./commands/unmarshalNumber');
var unmarshalNumberSet = require('./commands/unmarshalNumberSet');
var unmarshalNull = require('./commands/unmarshalNull');
var unmarshalMap = require('./commands/unmarshalMap');
var unmarshalList = require('./commands/unmarshalList');

// Command lists
var marshalCommandList = [
  marshalString,
  marshalNumber,
  marshalBoolean,
  marshalNull,
  marshalStringSet,
  marshalNumberSet,
  marshalList,
  marshalMap
];
var unmarshalCommandList = [
  unmarshalPassThrough,
  unmarshalNumber,
  unmarshalNumberSet,
  unmarshalNull,
  unmarshalMap,
  unmarshalList
];

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
var marshal = function(item) {
  var i;
  var len = marshalCommandList.length;
  var command;
  var result;
  var errorMessage;
  var marshaledItem = {};

  for (i = 0; i < len; i++) {
    command = marshalCommandList[i];
    result = command(item, marshal);

    if (!_.isUndefined(result)) {
      break;
    }
  }

  if (_.isUndefined(result)) {
    errorMessage = 'Marshaling error: encountered ' +
      ((item) ? ('unexpected item ' + item) : 'empty value');

    throw new TypeError(errorMessage);
  }

  return _.assign(marshaledItem, result);
};

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
var unmarshal = function(item) {
  var i;
  var len = unmarshalCommandList.length;
  var command;
  var errorMessage;
  var unmarshaledItem;

  for (i = 0; i < len; i++) {
    command = unmarshalCommandList[i];
    unmarshaledItem = command(item, unmarshal);

    if (!_.isUndefined(unmarshaledItem)) {
      break;
    }
  }

  if (_.isUndefined(unmarshaledItem)) {
    errorMessage = 'Unmarshal error: encountered unexpected item ' + item;
    throw new TypeError(errorMessage);
  }

  return unmarshaledItem;
};

/**
 * marshalService
 *
 * @type {{marshal: Function, unmarshal: Function}}
 */
module.exports = {
  marshal: marshal,
  unmarshal: unmarshal
};

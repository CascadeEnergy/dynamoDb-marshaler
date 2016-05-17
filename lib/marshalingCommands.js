'use strict';

var _ = require('lodash');
var unexpectedItemHandler = require('./unexpectedItemHandler');

/**
 * Converts boolean value to DynamoDb "BOOL"
 *
 * @param item
 * @returns {*}
 */
function marshalBoolean(item) {
  if (!_.isBoolean(item)) {
    return undefined;
  }

  return {BOOL: item};
}

/**
 * Converts mixed array to DynamoDb "L"
 *
 * @param item
 * @param marshal
 * @returns {*}
 */
function marshalList(item, marshal) {
  if (!_.isArray(item)) {
    return undefined;
  }

  return {L: _.map(item, marshal)};
}

/**
 * Converts object literal to DynamoDb "M"
 *
 * @param item
 * @param marshal
 * @returns {*}
 */
function marshalMap(item, marshal) {
  if (!_.isPlainObject(item)) {
    return undefined;
  }

  return {M: _.mapValues(item, marshal)};
}

/**
 * Converts null to DynamoDb "NULL"
 *
 * @param item
 * @returns {*}
 */
function marshalNull(item) {
  if (!_.isNil(item)) {
    return undefined;
  }

  return {NULL: true};
}

/**
 * Converts number to DynamoDb "N"
 *
 * @param item
 * @returns {*}
 */
function marshalNumber(item) {
  if (!_.isNumber(item)) {
    return undefined;
  }

  return {N: item.toString()};
}

/**
 * Helper function for arrays to DynamoDb "NS"
 *
 * @param arr
 * @returns {*}
 */
function marshalArrayToNumberSet(arr) {
  if (
    _.isEmpty(arr) ||
    !_.every(arr, _.isNumber) ||
    _.uniq(arr).length !== arr.length
  ) {
    return undefined;
  }

  return {
    NS: _.map(arr, function(num) {
      return num.toString();
    })
  };
}

/**
 * Converts Arrays and Sets to DynamoDb "NS"
 *
 * @param item
 * @returns {*}
 */
function marshalNumberSet(item) {
  if (_.isArray(item)) {
    return marshalArrayToNumberSet(item);
  }

  return undefined;
}

/**
 * Converts strings to DynamoDb "S"
 *
 * @param item
 * @returns {*}
 */
function marshalString(item) {
  if (!_.isString(item) || _.isEmpty(item)) {
    return undefined;
  }

  return {S: item};
}

/**
 * Helper function for arrays to DynamoDb "SS"
 *
 * @param arr
 * @returns {*}
 */
function marshalArrayToStringSet(arr) {
  if (
    _.isEmpty(arr) ||
    !_.every(arr, _.isString) ||
    _.uniq(arr).length !== arr.length
  ) {
    return undefined;
  }

  return {SS: arr};
}

/**
 * Converts Arrays and Sets to DynamoDb "SS"
 *
 * @param item
 * @returns {*}
 */
function marshalStringSet(item) {
  if (_.isArray(item)) {
    return marshalArrayToStringSet(item);
  }

  return undefined;
}

module.exports = [
  marshalString,
  marshalNumber,
  marshalBoolean,
  marshalNull,
  marshalStringSet,
  marshalNumberSet,
  marshalList,
  marshalMap,
  unexpectedItemHandler
];

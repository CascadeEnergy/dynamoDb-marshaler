'use strict';

var _ = require('lodash/fp');
var unexpectedItemHandler = require('./unexpectedItemHandler');
var transform = require('./transform');

var objOf = _.set(_, _, {});

/**
 * Converts boolean value to DynamoDb "BOOL"
 *
 * @param item
 * @returns {*}
 */
var marshalBoolean = transform(_.isBoolean, objOf('BOOL'));

/**
 * Converts mixed array to DynamoDb "L"
 *
 * @param item
 * @param marshal
 * @returns {*}
 */
function marshalList(item, marshal) {
  return transform(_.isArray, _.compose(objOf('L'), _.map(marshal)), item);
}

/**
 * Converts object literal to DynamoDb "M"
 *
 * @param item
 * @param marshal
 * @returns {*}
 */
function marshalMap(item, marshal) {
  return transform(_.isPlainObject, _.compose(objOf('M'), _.mapValues(marshal)), item);
}

/**
 * Converts null to DynamoDb "NULL"
 *
 * @param item
 * @returns {*}
 */
var marshalNull = transform(_.isNil, _.constant({NULL: true}));

/**
 * Converts number to DynamoDb "N"
 *
 * @param item
 * @returns {*}
 */
var marshalNumber = transform(_.isNumber, _.compose(objOf('N'), _.toString));

function isNumberSet(arr) {
  return !_.isEmpty(arr) &&
     _.every(_.isNumber, arr) &&
      _.uniq(arr).length === arr.length
}

/**
 * Helper function for arrays to DynamoDb "NS"
 *
 * @param arr
 * @returns {*}
 */
var marshalArrayToNumberSet = transform(isNumberSet, _.compose(objOf('NS'), _.map(_.toString)));

/**
 * Converts Arrays and Sets to DynamoDb "NS"
 *
 * @param item
 * @returns {*}
 */
var marshalNumberSet = transform(_.isArray, marshalArrayToNumberSet);

/**
 * Converts strings to DynamoDb "S"
 *
 * @param item
 * @returns {*}
 */
var marshalString = transform(_.overSome(_.isString, _.negate(_.isEmpty)), objOf('S'));

function isStringSet(arr) {
  return !_.isEmpty(arr) &&
     _.every(_.isString, arr) &&
      _.uniq(arr).length === arr.length
}

/**
 * Helper function for arrays to DynamoDb "SS"
 *
 * @param arr
 * @returns {*}
 */
var marshalArrayToStringSet = transform(isStringSet, objOf('SS'));

/**
 * Converts Arrays and Sets to DynamoDb "SS"
 *
 * @param item
 * @returns {*}
 */
var marshalStringSet = transform(_.isArray, marshalArrayToStringSet);

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

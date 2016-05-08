'use strict';

var _ = require('lodash');
var unexpectedItemHandler = require('./unexpectedItemHandler');

/**
 * Converts DynamoDb "L" to mixed array
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
function unmarshalList(item, unmarshal) {
  if (!_.has(item, 'L')) {
    return undefined;
  }

  return _.map(item.L, unmarshal);
}

/**
 * Converts DynamoDb "M" to object literal
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
function unmarshalMap(item, unmarshal) {
  if (!_.has(item, 'M')) {
    return undefined;
  }

  return _.mapValues(item.M, unmarshal);
}

/**
 * Converts DynamoDb "NULL" to null
 *
 * @param item
 * @returns {*}
 */
function unmarshalNull(item) {
  if (!_.has(item, 'NULL')) {
    return undefined;
  }

  return null;
}

/**
 * Converts DynamoDb "N" to Number
 *
 * @param item
 * @returns {*}
 */
function unmarshalNumber(item) {
  if (!_.has(item, 'N')) {
    return undefined;
  }

  return parseFloat(item.N);
}

/**
 * Converts DynamoDb "NS" to Set of Numbers
 *
 * @param item
 * @returns {*}
 */
function unmarshalNumberSet(item) {
  if (!_.has(item, 'NS')) {
    return undefined;
  }

  return _.map(item.NS, parseFloat);
}

/**
 * Converts DynamoDb "SS" to Set of Strings
 *
 * @param item
 * @returns {*}
 */
function unmarshalStringSet(item) {
  if (!_.has(item, 'SS')) {
    return undefined;
  }

  return item.SS;
}

/**
 * Converts DynamoDb "S", "B", "BS", "BOOL" to values.
 *
 * @param item
 * @returns {*}
 */
function unmarshalPassThrough(item) {
  var key = _.find(['S', 'B', 'BS', 'BOOL'], function(type) {
    return _.has(item, type);
  });

  if (!key) {
    return undefined;
  }

  return item[key];
}

module.exports = [
  unmarshalPassThrough,
  unmarshalNumber,
  unmarshalStringSet,
  unmarshalNumberSet,
  unmarshalNull,
  unmarshalMap,
  unmarshalList,
  unexpectedItemHandler
];

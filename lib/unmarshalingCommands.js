'use strict';

var _ = require('lodash/fp');
var unexpectedItemHandler = require('./unexpectedItemHandler');
var transform = require('./transform');

/**
 * Converts DynamoDb "L" to mixed array
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
function unmarshalList(item, unmarshal) {
  return transform(_.has('L'), _.compose(_.map(unmarshal), _.property('L')), item);
}

/**
 * Converts DynamoDb "M" to object literal
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
function unmarshalMap(item, unmarshal) {
  return transform(_.has('M'), _.compose(_.mapValues(unmarshal), _.property('M')), item);
}

/**
 * Converts DynamoDb "NULL" to null
 *
 * @param item
 * @returns {*}
 */
var unmarshalNull = transform(_.has('NULL'), _.constant(null));

/**
 * Converts DynamoDb "N" to Number
 *
 * @param item
 * @returns {*}
 */
var unmarshalNumber = transform(_.has('N'), _.compose(parseFloat, _.property('N')));

/**
 * Converts DynamoDb "NS" to Set of Numbers
 *
 * @param item
 * @returns {*}
 */
var unmarshalNumberSet = transform(_.has('NS'), _.compose(_.map(parseFloat), _.property('NS')));

/**
 * Converts DynamoDb "SS" to Set of Strings
 *
 * @param item
 * @returns {*}
 */
var unmarshalStringSet = transform(_.has('SS'), _.property('SS'));

/**
 * Converts DynamoDb "S", "B", "BS", "BOOL" to values.
 *
 * @param item
 * @returns {*}
 */

function unmarshalPassThrough(item) {
  var key = _.find(function(type) {
    return _.has(type, item);
  }, ['S', 'B', 'BS', 'BOOL']);

  return !key ? void 0 : item[key];
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

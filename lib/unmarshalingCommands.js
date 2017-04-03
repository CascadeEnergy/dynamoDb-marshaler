'use strict';

var _ = require('lodash/fp');
var unexpectedItemHandler = require('./unexpectedItemHandler');
var transform = require('./transform');

**
 * Converts DynamoDb "L" to mixed array
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
function unmarshalList(item, unmarshal) {
  if (!_.has(item, 'L') && !_.has(item, 'l') ) {
    return undefined;
  }

  if (_.has(item, 'L')) {
    return _.map(item.L, unmarshal);
  }

  if (_.has(item, 'l')) {
    return _.map(item.l, unmarshal);
  }

}

/**
 * Converts DynamoDb "M" to object literal
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
function unmarshalMap(item, unmarshal) {
  if (!_.has(item, 'M') && !_.has(item, 'm')) {
    return undefined;
  }

  if (_.has(item, 'M')) {
    return _.mapValues(item.M, unmarshal);
  }

  if (_.has(item, 'm')) {
    return _.mapValues(item.m, unmarshal);
  }
}

/**
 * Converts DynamoDb "NULL" to null
 *
 * @param item
 * @returns {*}
 */
function unmarshalNull(item) {
  if (!_.has(item, 'NULL') && !_.has(item, 'null')) {
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
  if (!_.has(item, 'N') && !_.has(item, 'n')) {
    return undefined;
  }

  if (_.has(item, 'N')) {
        return parseFloat(item.N);
  }

  if (_.has(item, 'n')) {
    return parseFloat(item.n);
  }
}

/**
 * Converts DynamoDb "NS" to Set of Numbers
 *
 * @param item
 * @returns {*}
 */
function unmarshalNumberSet(item) {
  if (!_.has(item, 'NS') && !_.has(item, 'ns') && !_.has(item, 'Ns') && !_.has(item, 'nS') ) {
    return undefined;
  }

  if (_.has(item, 'NS')) {
   return _.map(item.NS, parseFloat);
  }

  if (_.has(item, 'ns')) {
    return _.map(item.ns, parseFloat);
  }

  if (_.has(item, 'nS')) {
    return _.map(item.nS, parseFloat);
  }

  if (_.has(item, 'Ns')) {
    return _.map(item.Ns, parseFloat);
  }
}

/**
 * Converts DynamoDb "SS" to Set of Strings
 *
 * @param item
 * @returns {*}
 */
function unmarshalStringSet(item) {
  if (!_.has(item, 'SS') && !_.has(item, 'ss') && !_.has(item, 'sS') && !_.has(item, 'Ss')) {
    return undefined;
  }

  if (_.has(item, 'SS')) {
   return item.SS;
  }

  if (_.has(item, 'ss')) {
    return item.ss;
  }

  if (_.has(item, 'Ss')) {
    return item.Ss;
  }

  if (_.has(item, 'sS')) {
    return item.sS;
  }
}

/**
 * Converts DynamoDb "S", "B", "BS", "BOOL" to values.
 *
 * @param item
 * @returns {*}
 */
function unmarshalPassThrough(item) {
  var key = _.find(['S', 'B', 'BS', 'BOOL','s','b','bs','bool','bOOL', 'boOl' , 'booL' ], function(type) {
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

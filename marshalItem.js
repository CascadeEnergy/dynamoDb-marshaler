'use strict';

var ensureItemIsObject = require('./lib/ensureItemIsObject');
var marshal = require('./marshal');

/**
 * Translates a javascript object into a format ready for DynamoDb.
 *
 * @param {Object} item Plain javascript object.
 * @returns {Object} The marshaled dynamoDb item.
 */
function marshalItem(item) {
  return marshal(item).M;
}

module.exports = ensureItemIsObject(marshalItem);

'use strict';

var ensureItemIsObject = require('./lib/ensureItemIsObject');
var unmarshal = require('./unmarshal');

/**
 * Translates a DynamoDb formatted object (a response from DynamoDb sdk) into
 * a plain javascript object with DynamoDb AttributeValue objects.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {Object} A javascript object in normal form.
 */
function unmarshalItem(item) {
  return unmarshal({ M: item });
}

module.exports = ensureItemIsObject(unmarshalItem);

'use strict';

var marshalItem = require('./marshalItem');

/**
 * Translates a JSON string into an object in DynamoDb format.
 *
 * @param {String} json A JSON representation of a javascript object.
 * @returns {Object} The marshaled DynamoDb compliant item.
 */
function marshalJson(json) {
  return marshalItem(JSON.parse(json));
}

module.exports = marshalJson;

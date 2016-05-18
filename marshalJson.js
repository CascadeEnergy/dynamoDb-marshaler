'use strict';

var _ = require('lodash/fp');
var marshalItem = require('./marshalItem');

/**
 * Translates a JSON string into an object in DynamoDb format.
 *
 * @param {String} json A JSON representation of a javascript object.
 * @returns {Object} The marshaled DynamoDb compliant item.
 */
module.exports = _.compose(marshalItem, JSON.parse);

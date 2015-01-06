'use strict';

var _ = require('lodash');
var marshalService = require('./lib/marshalService');

/**
 * Function decorator, validates item is a javascript object.
 *
 * @param callback
 * @returns {Function}
 */
var ensureItemIsObject = function (callback) {
  return function (item) {
    if (_.isPlainObject(item)) {
      return callback(item);
    }
    throw new TypeError('Item must be plain object literal');
  };
};

/**
 * Translates a javascript object into a format ready for DynamoDb.
 *
 * @param {Object} item Plain javascript object.
 * @returns {Object} The marshaled item dynamoDb compliant item.
 */
var marshalItem = ensureItemIsObject(function (item) {
  var marshaledItem = marshalService.marshal(item);
  return marshaledItem.M;
});

/**
 * Translates a JSON string into an object in DynamoDb format.
 *
 * @param {String} json A JSON representation of a javascript object.
 * @returns {Object} The marshaled DynamoDb compliant item.
 */
var marshalJson = function (json) {
  return marshalItem(JSON.parse(json));
};

/**
 * Translates a DynamoDb formatted object (a response from DynamoDb sdk) into
 * a plain javascript object with DynamoDb AttributeValue objects.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {Object} A javascript object in normal form.
 */
var unmarshalItem = ensureItemIsObject(function (item) {
  return marshalService.unmarshal({M: item});
});

/**
 * Translates a DynamoDb formatted object, into a normally formatted object
 * represented as a JSON string.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {String} JSON representation of a javascript object.
 */
var unmarshalJson = function (item) {
  return JSON.stringify(unmarshalItem(item));
};

/**
 * The dynamodb-marshaler
 *
 * @type {{
 *  marshalJson: Function,
 *  marshalItem: Function,
 *  unmarshalItem: Function,
 *  unmarshalJson: Function
 * }}
 */
module.exports = {
  marshalJson: marshalJson,
  marshalItem: marshalItem,
  unmarshalItem: unmarshalItem,
  unmarshalJson: unmarshalJson
};

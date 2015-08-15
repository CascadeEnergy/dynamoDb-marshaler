import unmarshalItem from './unmarshalItem';

/**
 * Translates a DynamoDb formatted object, into a normally formatted object
 * represented as a JSON string.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {String} JSON representation of a javascript object.
 */
function unmarshalJson(item) {
  return JSON.stringify(unmarshalItem(item));
}

export default unmarshalJson;

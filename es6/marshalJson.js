import marshalItem from './marshalItem';

/**
 * Translates a JSON string into an object in DynamoDb format.
 *
 * @param {String} json A JSON representation of a javascript object.
 * @returns {Object} The marshaled DynamoDb compliant item.
 */
function marshalJson(json) {
  return marshalItem(JSON.parse(json));
}

export default marshalJson;

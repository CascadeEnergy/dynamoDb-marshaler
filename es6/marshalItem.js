import ensureItemIsObject from './lib/ensureItemIsObject';
import marshal from './marshal';

/**
 * Translates a javascript object into a format ready for DynamoDb.
 *
 * @param {Object} item Plain javascript object.
 * @returns {Object} The marshaled dynamoDb item.
 */
function marshalItem(item) {
  return marshal(item).M;
}

export default ensureItemIsObject(marshalItem);

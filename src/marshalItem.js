require('babel/polyfill');
import ensureItemIsObject from './lib/ensureItemIsObject';
import {toDDB} from './lib/converter';

/**
 * Translates a javascript object into a format ready for DynamoDb.
 *
 * @param {Object} item Plain javascript object.
 * @returns {Object} The marshaled dynamoDb item.
 */
function marshalItem(item) {
  var marshaledItem = toDDB(item);
  return marshaledItem.M;
}

export default ensureItemIsObject(marshalItem);

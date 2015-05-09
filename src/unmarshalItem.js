import ensureItemIsObject from './lib/ensureItemIsObject';
import {toJS} from './lib/converter';

/**
 * Translates a DynamoDb formatted object (a response from DynamoDb sdk) into
 * a plain javascript object with DynamoDb AttributeValue objects.
 *
 * @param {Object} item DynamoDb formatted object.
 * @returns {Object} A javascript object in normal form.
 */
function unmarshalItem(item) {
  return toJS({M: item});
}

export default ensureItemIsObject(unmarshalItem);

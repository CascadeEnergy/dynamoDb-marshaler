import {isUndefined} from 'lodash';
import {unmarshalCommandList, marshalCommandList} from './commands';

/**
 * Uses the chain of command pattern to select the marshaling algorithm.
 * Once a command marshals the item it is assigned to the return data and
 * no further commands are called.
 *
 * Each command is passed a reference to this marshal function as well because
 * in the case of the "M" (Map) and "L" (List) DynamoDb types their subvalues
 * also need to be marshaled.
 *
 * input: {foo: 'bar'}
 * output: {M: {foo: {S: 'bar'}}}
 *
 * @param {*} item A value to marshal.
 * @returns {Object} A DynamoDb AttributeValue object.
 */
export function toDDB(item) {
  let result;

  for (let command of marshalCommandList) {
    result = command(item, toDDB);

    if (!isUndefined(result)) {
      break;
    }
  }

  if (isUndefined(result)) {
    throw new TypeError(
      `Marshaling error: encountered unexpected item ${item}`
    );
  }

  return Object.assign({}, result);
}

/**
 * Uses the chain of command pattern to select the unmarshaling algorithm to
 * use for the given AttributeValue object based on the type key. Once a
 * command handles the item, no further commands are called and the unmarshaled
 * data is returned.
 *
 * input: {M: {foo: {S: 'bar'}}}
 * output: {foo: 'bar'}
 *
 * @param {Object} item A DynamoDb formatted AttributeValue object.
 * @returns {*} Unmarshaled value.
 */
export function toJS(item) {
  let unmarshaledItem;

  for (let command of unmarshalCommandList) {
    unmarshaledItem = command(item, toJS);

    if (!isUndefined(unmarshaledItem)) {
      break;
    }
  }

  if (isUndefined(unmarshaledItem)) {
    throw new TypeError(
      `Unmarshal error: encountered unexpected item ${item}`
    );
  }

  return unmarshaledItem;
}

export default { toDDB, toJS };

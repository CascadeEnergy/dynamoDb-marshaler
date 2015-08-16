import _ from 'lodash';

function unexpectedItemHandler(item) {
  throw new TypeError(`Encountered unexpected item`);
}

// Marshal command chain
export const marshalCommandList = [
  marshalString,
  marshalNumber,
  marshalBoolean,
  marshalNull,
  marshalStringSet,
  marshalNumberSet,
  marshalList,
  marshalMap,
  unexpectedItemHandler
];

// Unmarshal command chain
export const unmarshalCommandList = [
  unmarshalPassThrough,
  unmarshalNumber,
  unmarshalStringSet,
  unmarshalNumberSet,
  unmarshalNull,
  unmarshalMap,
  unmarshalList,
  unexpectedItemHandler
];

/**
 * Converts boolean value to DynamoDb "BOOL"
 *
 * @param item
 * @returns {*}
 */
export function marshalBoolean(item) {
  if (!_.isBoolean(item)) {
    return undefined;
  }

  return {BOOL: item};
}

/**
 * Converts mixed array to DynamoDb "L"
 *
 * @param item
 * @param marshal
 * @returns {*}
 */
export function marshalList(item, marshal) {
  if (!_.isArray(item)) {
    return undefined;
  }

  return {L: _.map(item, marshal)};
}

/**
 * Converts object literal to DynamoDb "M"
 *
 * @param item
 * @param marshal
 * @returns {*}
 */
export function marshalMap(item, marshal) {
  // Todo make this accept ES6 Map or Object Literal
  if (!_.isPlainObject(item)) {
    return undefined;
  }

  return {M: _.mapValues(item, value => marshal(value))};
}

/**
 * Converts null to DynamoDb "NULL"
 *
 * @param item
 * @returns {*}
 */
export function marshalNull(item) {
  if (!_.isNull(item) && !_.isUndefined(item)) {
    return undefined;
  }

  return {NULL: true};
}

/**
 * Converts number to DynamoDb "N"
 *
 * @param item
 * @returns {*}
 */
export function marshalNumber(item) {
  if (!_.isNumber(item)) {
    return undefined;
  }

  return {N: item.toString()};
}

/**
 * Helper function for arrays to DynamoDb "NS"
 *
 * @param arr
 * @returns {*}
 */
function marshalArrayToNumberSet(arr) {
  if (
    _.isEmpty(arr) ||
    !_.every(arr, _.isNumber) ||
    _.uniq(arr).length !== arr.length
  ) {
    return undefined;
  }

  return {NS: _.map(arr, num => num.toString())};
}

/**
 * Converts Arrays and Sets to DynamoDb "NS"
 *
 * @param item
 * @returns {*}
 */
export function marshalNumberSet(item) {
  if (_.isArray(item)) {
    return marshalArrayToNumberSet(item);
  }

  if (item instanceof Set) {
    return marshalArrayToNumberSet(Array.from(item));
  }

  return undefined;
}

/**
 * Converts strings to DynamoDb "S"
 *
 * @param item
 * @returns {*}
 */
export function marshalString(item) {
  if (!_.isString(item) || _.isEmpty(item)) {
    return undefined;
  }

  return {S: item};
}

/**
 * Helper function for arrays to DynamoDb "SS"
 *
 * @param arr
 * @returns {*}
 */
function marshalArrayToStringSet(arr) {
  if (
    _.isEmpty(arr) ||
    !_.every(arr, _.isString) ||
    _.uniq(arr).length !== arr.length
  ) {
    return undefined;
  }

  return {SS: arr};
}

/**
 * Converts Arrays and Sets to DynamoDb "SS"
 *
 * @param item
 * @returns {*}
 */
export function marshalStringSet(item) {
  if (_.isArray(item)) {
    return marshalArrayToStringSet(item);
  }

  if (item instanceof Set) {
    return marshalArrayToStringSet(Array.from(item));
  }

  return undefined;
}

/**
 * Converts DynamoDb "L" to mixed array
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
export function unmarshalList(item, unmarshal) {
  if (!_.has(item, 'L')) {
    return undefined;
  }

  return _.map(item.L, unmarshal);
}

/**
 * Converts DynamoDb "M" to object literal
 *
 * @param item
 * @param unmarshal
 * @returns {*}
 */
export function unmarshalMap(item, unmarshal) {
  // Todo Make this convert to ES6 Map instead of object literal
  if (!_.has(item, 'M')) {
    return undefined;
  }

  return _.mapValues(item.M, unmarshal);
}

/**
 * Converts DynamoDb "NULL" to null
 *
 * @param item
 * @returns {*}
 */
export function unmarshalNull(item) {
  if (!_.has(item, 'NULL')) {
    return undefined;
  }

  return null;
}

/**
 * Converts DynamoDb "N" to Number
 *
 * @param item
 * @returns {*}
 */
export function unmarshalNumber(item) {
  if (!_.has(item, 'N')) {
    return undefined;
  }

  return parseFloat(item.N);
}

/**
 * Converts DynamoDb "NS" to Set of Numbers
 *
 * @param item
 * @returns {*}
 */
export function unmarshalNumberSet(item) {
  if (!_.has(item, 'NS')) {
    return undefined;
  }

  return _.map(item.NS, parseFloat);
}

/**
 * Converts DynamoDb "SS" to Set of Strings
 *
 * @param item
 * @returns {*}
 */
export function unmarshalStringSet(item) {
  if (!_.has(item, 'SS')) {
    return undefined;
  }

  return item.SS;
}

/**
 * Converts DynamoDb "S", "B", "BS", "BOOL" to values.
 *
 * @param item
 * @returns {*}
 */
export function unmarshalPassThrough(item) {
  const key = _.find(['S', 'B', 'BS', 'BOOL'], type => _.has(item, type));

  if (!key) {
    return undefined;
  }

  return item[key];
}

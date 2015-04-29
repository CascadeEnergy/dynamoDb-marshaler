import _ from 'lodash';

// Command lists
export var marshalCommandList = [
  marshalString,
  marshalNumber,
  marshalBoolean,
  marshalNull,
  marshalStringSet,
  marshalNumberSet,
  marshalList,
  marshalMap
];

export var unmarshalCommandList = [
  unmarshalPassThrough,
  unmarshalNumber,
  unmarshalStringSet,
  unmarshalNumberSet,
  unmarshalNull,
  unmarshalMap,
  unmarshalList
];

export function marshalBoolean(item) {
  if (!_.isBoolean(item)) {
    return undefined;
  }
  return {BOOL: item};
}

export function marshalList(item, marshal) {
  if (!_.isArray(item)) {
    return undefined;
  }

  item = _.map(item, marshal);
  return {L: item};
}

export function marshalMap(item, marshal) {
  if (!_.isPlainObject(item)) {
    return undefined;
  }

  item = _.reduce(item, function(result, value, key) {
    result[key] = marshal(value);
    return result;
  }, {});

  return {M: item};
}

export function marshalNull(item) {
  if (!_.isNull(item) && !_.isUndefined(item)) {
    return undefined;
  }
  return {NULL: true};
}

export function marshalNumber(item) {
  if (!_.isNumber(item)) {
    return undefined;
  }
  return {N: item.toString()};
}

function marshalArrayToNumberSet(arr) {
  if (
    _.isEmpty(arr) ||
    !_.every(arr, _.isNumber) ||
    _.uniq(arr).length !== arr.length
  ) {
    return undefined;
  }

  arr = _.map(arr, function stringify(num) {
    return num.toString();
  });

  return { NS: arr };
}

export function marshalNumberSet(item) {
  if (_.isArray(item)) {
    return marshalArrayToNumberSet(item);
  }

  if (item instanceof Set) {
    return marshalArrayToNumberSet(Array.from(item));
  }

  return undefined;
}

export function marshalString(item) {
  if (!_.isString(item) || _.isEmpty(item)) {
    return undefined;
  }
  return {S: item};
}

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

export function marshalStringSet(item) {
  if (_.isArray(item)) {
    return marshalArrayToStringSet(item);
  }

  if (item instanceof Set) {
    return marshalArrayToStringSet(Array.from(item));
  }

  return undefined;
}

export function unmarshalList(item, unmarshal) {
  if (!_.has(item, 'L')) {
    return undefined;
  }

  return _.map(item.L, unmarshal);
}

export function unmarshalMap(item, unmarshal) {
  if (!_.has(item, 'M')) {
    return undefined;
  }

  return _.mapValues(item.M, unmarshal);
}

export function unmarshalNull(item) {
  if (!_.has(item, 'NULL')) {
    return undefined;
  }

  return null;
}

export function unmarshalNumber(item) {
  if (!_.has(item, 'N')) {
    return undefined;
  }

  return parseFloat(item.N);
}

export function unmarshalNumberSet(item) {
  if (!_.has(item, 'NS')) {
    return undefined;
  }

  return new Set(_.map(item.NS, parseFloat));
}

export function unmarshalStringSet(item) {
  if (!_.has(item, 'SS')) {
    return undefined;
  }

  return new Set(item.SS);
}

export function unmarshalPassThrough(item) {
  let typeList = ['S', 'B', 'BS', 'BOOL'];

  var key = _.find(typeList, function(type) {
    return _.has(item, type);
  });

  if (!key) {
    return undefined;
  }

  return item[key];
}

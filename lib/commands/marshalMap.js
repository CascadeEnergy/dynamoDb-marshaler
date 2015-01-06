'use strict';

var _ = require('lodash');

module.exports = function (item, marshal) {
  if (!_.isPlainObject(item)) {
    return undefined;
  }

  item = _.reduce(item, function (result, value, key) {
    result[key] = marshal(value);
    return result;
  }, {});

  return {M: item};
};

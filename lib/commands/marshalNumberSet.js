'use strict';

var _ = require('lodash');

module.exports = function (item) {
  if (!_.isArray(item)) {
    return undefined;
  }

  if (!_.every(item, _.isNumber)) {
    return undefined;
  }

  item = _.map(item, function (num) {
    return num.toString();
  });

  return {NS: item};
};

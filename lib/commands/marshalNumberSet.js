'use strict';

var _ = require('lodash');

module.exports = function(item) {
  if (
    !_.isArray(item) ||
    _.isEmpty(item) ||
    !_.every(item, _.isNumber) ||
    _.uniq(item).length !== item.length
  ) {
    return undefined;
  }

  item = _.map(item, function stringify(num) {
    return num.toString();
  });

  return {NS: item};
};

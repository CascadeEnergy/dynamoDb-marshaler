'use strict';

var _ = require('lodash');

module.exports = function(item) {
  if (!_.isNumber(item)) {
    return undefined;
  }
  return {N: item.toString()};
};

'use strict';

var _ = require('lodash');

module.exports = function(item) {
  if (!_.isBoolean(item)) {
    return undefined;
  }
  return {BOOL: item};
};

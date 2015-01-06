'use strict';

var _ = require('lodash');

module.exports = function (item) {
  if (!_.has(item, 'NULL')) {
    return undefined;
  }

  return null;
};

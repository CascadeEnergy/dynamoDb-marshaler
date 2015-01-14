'use strict';

var _ = require('lodash');

module.exports = function(item, unmarshal) {
  if (!_.has(item, 'M')) {
    return undefined;
  }

  return _.mapValues(item.M, unmarshal);
};

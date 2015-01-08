'use strict';

var _ = require('lodash');

module.exports = function(item) {
  if (!_.has(item, 'NS')) {
    return undefined;
  }

  return _.map(item.NS, parseFloat);
};

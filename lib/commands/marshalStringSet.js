'use strict';

var _ = require('lodash');

module.exports = function(item) {
  if (
    !_.isArray(item) ||
    _.isEmpty(item) ||
    !_.every(item, _.isString) ||
    _.uniq(item).length !== item.length
  ) {
    return undefined;
  }

  return {SS: item};
};

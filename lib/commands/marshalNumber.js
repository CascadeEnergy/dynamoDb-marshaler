'use strict';

var _ = require('lodash');

module.exports = function(item) {
    if (!_.isNumber(item)) {
        return null;
    }
    return {N: item.toString()};
};

'use strict';

var _ = require('lodash');

module.exports = function(item) {
    if (!_.isBoolean(item)) {
        return null;
    }
    return {BOOL: item};
};

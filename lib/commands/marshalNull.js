'use strict';

var _ = require('lodash');

module.exports = function(item) {
    if (!_.isNull(item) && !_.isUndefined(item)) {
        return null;
    }
    return {NULL: true};
};

'use strict';

var _ = require('lodash');

module.exports = function(item) {
    if (!_.isString(item)) {
        return null;
    }
    return {S: item};
};

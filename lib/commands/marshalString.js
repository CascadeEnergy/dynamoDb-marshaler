'use strict';

var _ = require('lodash');

module.exports = function(item) {
    if (!_.isString(item) || _.isEmpty(item)) {
        return undefined;
    }
    return {S: item};
};

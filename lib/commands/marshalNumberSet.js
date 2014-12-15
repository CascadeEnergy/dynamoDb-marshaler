'use strict';

var _ = require('lodash');

module.exports = function (item) {
    if (!_.isArray(item)) {
        return null;
    }

    if (!_.every(item, _.isNumber)) {
        return null;
    }

    item = _.map(item, function(num) {
        return num.toString();
    });

    return {NS: item};
};

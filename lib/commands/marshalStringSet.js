'use strict';

var _ = require('lodash');

module.exports = function (item) {
    var isStringSet;

    if (!_.isArray(item)) {
        return null;
    }

    isStringSet = _.every(item, _.isString);

    if (!isStringSet) {
        return null;
    }

    return {SS: item};
};

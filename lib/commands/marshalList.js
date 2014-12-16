'use strict';

var _ = require('lodash');

module.exports = function (item, marshal) {
    if (!_.isArray(item)) {
        return undefined;
    }

    item = _.map(item, marshal);
    return {L: item};
};

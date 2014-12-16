'use strict';

var _ = require('lodash');

module.exports = function(item, unmarshal) {
    if (!_.has(item, 'L')) {
        return undefined;
    }

    return _.map(item.L, unmarshal);
};

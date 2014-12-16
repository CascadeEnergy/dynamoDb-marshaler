'use strict';

var _ = require('lodash');

module.exports = function(item) {
    if (!_.has(item, 'N')) {
        return undefined;
    }

    return parseFloat(item.N);
};

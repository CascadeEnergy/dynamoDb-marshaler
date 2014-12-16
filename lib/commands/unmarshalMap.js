'use strict';

var _ = require('lodash');

module.exports = function(item, unmarshal) {
    if (!_.has(item, 'M')) {
        return undefined;
    }

    return _.reduce(item.M, function(result, value, key) {
        result[key] = unmarshal(value);
        return result;
    }, {});
};

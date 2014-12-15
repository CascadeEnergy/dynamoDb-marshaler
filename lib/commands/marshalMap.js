'use strict';

var _ = require('lodash');

module.exports = function(item, chain) {
    if (!_.isPlainObject(item)) {
        return null;
    }

    item = _.reduce(item, function(result, value, key) {
        result[key] = chain.marshal.call(chain, value);
        return result;
    }, {});

    return {M: item};
};

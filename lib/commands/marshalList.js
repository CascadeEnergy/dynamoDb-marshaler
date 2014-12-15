'use strict';

var _ = require('lodash');

module.exports = function (item, chain) {
    if (!_.isArray(item)) {
        return null;
    }

    item = _.map(item, chain.marshal, chain);
    return {L: item};
};

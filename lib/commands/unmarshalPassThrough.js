'use strict';

var _ = require('lodash');

module.exports = function(item) {
    var typeList = ['S', 'SS', 'B', 'BS', 'BOOL'];

    var key = _.find(typeList, function(type) {
        return _.has(item, type);
    });

    if (!key) {
        return undefined;
    }

    return item[key];
};

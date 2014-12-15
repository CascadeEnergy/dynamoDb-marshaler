'use strict';

var _ = require('lodash');

var stringCommand = function(item) {
    if (!_.isString(item)) {
        return null;
    }
    return {S: item};
};

var numberCommand = function(item) {
    if (!_.isNumber(item)) {
        return null;
    }
    return {N: item.toString()};
};

var booleanCommand = function(item) {
    if (!_.isBoolean(item)) {
        return null;
    }
    return {BOOL: item};
};

var nullCommand = function(item) {
    if (!_.isNull(item) && !_.isUndefined(item)) {
        return null;
    }
    return {NULL: true};
};

var listCommand = function (item) {
    if (!_.isArray(item)) {
        return null;
    }

    item = _.map(item, marshal);
    return {L: item};
};

var mapCommand = function(item) {
    if (!_.isPlainObject(item)) {
        return null;
    }

    item = _.reduce(item, function(result, value, key) {
        result[key] = marshal(value);
        return result;
    }, {});

    return {M: item};
};

var commandList = [
    stringCommand,
    numberCommand,
    booleanCommand,
    nullCommand,
    listCommand,
    mapCommand
];

var marshal = function(item) {
    var data = {};

    _.forEach(commandList, function(command) {
        var result = command(item);

        if (_.isNull(result)) {
            return;
        }

        _.assign(data, result);
    });

    return data;
};

module.exports = {
    marshal: marshal
};

'use strict';

var _ = require('lodash'),

    // Marshal commands
    marshalString = require('./commands/marshalString'),
    marshalNumber = require('./commands/marshalNumber'),
    marshalBoolean = require('./commands/marshalBoolean'),
    marshalNull = require('./commands/marshalNull'),
    marshalStringSet = require('./commands/marshalStringSet'),
    marshalNumberSet = require('./commands/marshalNumberSet'),
    marshalList = require('./commands/marshalList'),
    marshalMap = require('./commands/marshalMap'),

    // Unmarshal commands
    unmarshalPassThrough = require('./commands/unmarshalPassThrough'),
    unmarshalNumber = require('./commands/unmarshalNumber'),
    unmarshalNumberSet = require('./commands/unmarshalNumberSet'),
    unmarshalNull = require('./commands/unmarshalNull'),
    unmarshalMap = require('./commands/unmarshalMap'),
    unmarshalList = require('./commands/unmarshalList'),

    // Command lists
    marshalCommandList = [
        marshalString,
        marshalNumber,
        marshalBoolean,
        marshalNull,
        marshalStringSet,
        marshalNumberSet,
        marshalList,
        marshalMap
    ],
    unmarshalCommandList = [
        unmarshalPassThrough,
        unmarshalNumber,
        unmarshalNumberSet,
        unmarshalNull,
        unmarshalMap,
        unmarshalList
    ];

var marshal = function(item) {
    var i,
        len = marshalCommandList.length,
        command,
        result,
        marshaledItem = {};

    for (i = 0; i < len; i++) {
        command = marshalCommandList[i];
        result = command(item, marshal);

        if (!_.isUndefined(result)) {
            _.assign(marshaledItem, result);
            break;
        }
    }

    return marshaledItem;
};

var unmarshal = function(item) {
    var i,
        len = unmarshalCommandList.length,
        command,
        unmarshaledItem;

    for (i = 0; i < len; i++) {
        command = unmarshalCommandList[i];
        unmarshaledItem = command(item, unmarshal);

        if (!_.isUndefined(unmarshaledItem)) {
            break;
        }
    }

    return unmarshaledItem;
};

module.exports = {
    marshal: marshal,
    unmarshal: unmarshal
};

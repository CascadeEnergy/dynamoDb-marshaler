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

/**
 * Uses the chain of command pattern to select the marshaling algorithm.
 * Once a command marshals the item it is assigned to the return data and
 * no further commands are called.
 *
 * Each command is passed a reference to this marshal function as well because in
 * the case of the "M" (Map) and "L" (List) DynamoDb types their subvalues also need
 * to be marshaled.
 *
 * input: {foo: 'bar'}
 * output: {M: {foo: {S: 'bar'}}}
 *
 * @param {*} item A value to marshal.
 * @returns {Object} A DynamoDb AttributeValue object.
 */
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

/**
 * Uses the chain of command pattern to select the unmarshaling algorithm to use for
 * the given AttributeValue object based on the type key. Once a command handles the item,
 * no further commands are called and the unmarshaled data is returned.
 *
 * input: {M: {foo: {S: 'bar'}}}
 * output: {foo: 'bar'}
 *
 * @param {Object} item A DynamoDb formatted AttributeValue object.
 * @returns {*} Unmarshaled value.
 */
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

/**
 * marshalService
 *
 * @type {{marshal: Function, unmarshal: Function}}
 */
module.exports = {
    marshal: marshal,
    unmarshal: unmarshal
};

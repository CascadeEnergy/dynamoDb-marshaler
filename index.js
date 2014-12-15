'use strict';

var _ = require('lodash'),
    marshalChain = require('./lib/marshalChain'),

    // Commands
    commandsPath = './lib/commands/',
    marshalString = require(commandsPath + 'marshalString'),
    marshalNumber = require(commandsPath + 'marshalNumber'),
    marshalBoolean = require(commandsPath + 'marshalBoolean'),
    marshalNull = require(commandsPath + 'marshalNull'),
    marshalList = require(commandsPath + 'marshalList'),
    marshalMap = require(commandsPath + 'marshalMap'),

    // Command Lists
    marshalCommandList = [
        marshalString,
        marshalNumber,
        marshalBoolean,
        marshalNull,
        marshalList,
        marshalMap
    ],

    // Marshal Chains
    marshaler = marshalChain(marshalCommandList);

var marshalItem = function(item) {
    var marshaledItem;

    if (!_.isPlainObject(item)) {
        throw new TypeError('Item must be plain object literal');
    }

    marshaledItem = marshaler.marshal(item);

    return marshaledItem.M;
};

var marshalJson = function(json) {
    return marshalItem(JSON.parse(json));
};

module.exports = {
    marshalJson: marshalJson,
    marshalItem: marshalItem
};

'use strict';

var _ = require('lodash'),
    marshalService = require('./lib/marshalService');

var ensureItemIsHash = function(item) {
    if (_.isPlainObject(item)) {
        return;
    }
    throw new TypeError('Item must be plain object literal');
};

var marshalItem = function(item) {
    ensureItemIsHash(item);
    var marshaledItem = marshalService.marshal(item);
    return marshaledItem.M;
};

var marshalJson = function(json) {
    return marshalItem(JSON.parse(json));
};

var unmarshalItem = function(item) {
    ensureItemIsHash(item);
    return marshalService.unmarshal({M: item});
};

var unmarshalJson = function(item) {
    return JSON.stringify(unmarshalItem(item));
};

module.exports = {
    marshalJson: marshalJson,
    marshalItem: marshalItem,
    unmarshalItem: unmarshalItem,
    unmarshalJson: unmarshalJson
};

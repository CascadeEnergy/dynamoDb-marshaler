'use strict';

var _ = require('lodash'),
    marshalChain = require('./lib/marshalChain'),
    marshal = marshalChain.marshal;

module.exports = {
    marshalJson: function(json) {
        return this.marshalItem(JSON.parse(json));
    },

    marshalItem: function(item) {
        var marshaledItem;

        if (!_.isPlainObject(item)) {
            throw new TypeError('Item must be plain object literal');
        }

        marshaledItem = marshal(item);

        return marshaledItem.M;
    }
};

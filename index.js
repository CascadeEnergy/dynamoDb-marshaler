'use strict';

var _ = require('lodash');

module.exports = {
    marshalItem: function(item) {
        var marshaledItem = this._marshalValue(item);
        var firstKey = _.pairs(marshaledItem)[0][0];
        return marshaledItem[firstKey];
    },

    _marshalValue: function(value) {
        var type;
        var data = {};

        if (_.isString(value) && !_.isEmpty(value)) {
            type = 'S';
        } else if (_.isNumber(value)) {
            type = 'N';
            value = '' + value;
        } else if (_.isBoolean(value)) {
            type = 'BOOL';
        } else if (_.isNull(value) || _.isUndefined(value)) {
            type = 'NULL';
            value = true;
        } else if (_.isArray(value)) {
            type = 'L';
            value = _.map(value, this._marshalValue);
        } else if (_.isPlainObject(value)) {
            type = 'M';
            value = _.reduce(value, function(result, v, k) {
                result[k] = this._marshalValue(v);
                return result;
            }, {}, this);
        } else {
            type = typeof value;
            throw new TypeError('Marshaling error: encountered unexpected type "' + type + '".');
        }

        data[type] = value;
        return data;
    }
};

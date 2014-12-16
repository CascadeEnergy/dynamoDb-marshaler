'use strict';

var marshalNull = require('../../lib/commands/marshalNull'),
    should = require('should'),
    withData = require('leche').withData;

describe('marshalNull', function() {
    it('should return null if item is not null or undefined', function() {
        var result = marshalNull({});
        (result === undefined).should.equal(true);
    });

    withData({
        'a null item': [null, {NULL: true}],
        'an undefined item': [undefined, {NULL: true}]
    }, function(item, expected) {
        it('should marshal item to dynamoDb "NULL" format', function() {
            marshalNull(item).should.eql(expected);
        });
    });
});

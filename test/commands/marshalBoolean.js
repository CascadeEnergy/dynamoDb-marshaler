'use strict';

var marshalBoolean = require('../../lib/commands/marshalBoolean'),
    should = require('should'),
    withData = require('leche').withData;

describe('marshalBoolean', function() {
    it('should return null if item is not a Boolean', function() {
        var result = marshalBoolean({});
        (result === null).should.equal(true);
    });

    withData({
        'a boolean false item': [false, {BOOL: false}],
        'a boolean true item': [true, {BOOL: true}]
    }, function(item, expected) {
        it('should marshal item to dynamoDb "BOOL" format', function() {
            marshalBoolean(item).should.eql(expected);
        });
    });
});

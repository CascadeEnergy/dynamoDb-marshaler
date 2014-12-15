'use strict';

var marshalNumberSet = require('../../lib/commands/marshalNumberSet'),
    should = require('should'),
    withData = require('leche').withData;

describe('marshalNumberSet', function() {
    withData({
        'an item that is not an array': [{}],
        'an array that is not all numbers': [[42, 'foo']]
    }, function(item) {
        it('should return null', function() {
            var result = marshalNumberSet(item);
            (result === null).should.eql(true);
        });
    });

    it('should marshal item to dynamoDb "NS" format', function() {
        marshalNumberSet([42, 12]).should.eql({NS: ['42', '12']});
    });
});

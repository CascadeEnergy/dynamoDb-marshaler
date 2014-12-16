'use strict';

var marshalNumber = require('../../lib/commands/marshalNumber'),
    should = require('should');

describe('marshalNumber', function() {
    it('should return undefined if item is not a Number', function() {
        var result = marshalNumber({});
        (result === undefined).should.equal(true);
    });

    it('should marshal item to dynamoDb "N" format', function() {
        marshalNumber(42).should.eql({N: '42'});
    });
});

'use strict';

var marshalList = require('../../lib/commands/marshalList'),
    should = require('should'),
    marshal = function(item) {
        return item + ' marshaled';
    };

describe('marshalList', function() {

    it('should return null if item is not an Array', function() {
        var result = marshalList({}, marshal);
        (result === undefined).should.equal(true);
    });

    it('should marshal each list item to the proper dynamoDb format', function() {
        var item = [42, 'foo', null],
            marshaledItem = ['42 marshaled', 'foo marshaled', 'null marshaled'],
            expected = {L: marshaledItem};

        marshalList(item, marshal).should.eql(expected);
    });
});

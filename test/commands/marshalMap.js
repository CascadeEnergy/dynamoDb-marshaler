'use strict';

var marshalMap = require('../../lib/commands/marshalMap'),
    should = require('should');

describe('marshalMap', function() {
    var chain = {
        marshal: function(item) {
            return item + ' marshaled';
        }
    };

    it('should return null if item is not a plain object', function() {
        var result = marshalMap([], chain);
        (result === null).should.equal(true);
    });

    it('should marshal each Map value to the proper dynamoDb format', function() {
        var item = {foo: 'bar', num: 42},
            marshaledItem = {foo: 'bar marshaled', num: '42 marshaled'},
            expected = {M: marshaledItem};

        marshalMap(item, chain).should.eql(expected);
    });
});

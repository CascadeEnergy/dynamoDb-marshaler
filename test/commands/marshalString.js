'use strict';

var marshalString = require('../../lib/commands/marshalString'),
    should = require('should');

describe('marshalString', function() {
    it('should return null if item is not a string', function() {
        var result = marshalString({});
        (result === null).should.equal(true);
    });

    it('should marshal item to dynamoDb "S" format', function() {
        marshalString('foo').should.eql({S: 'foo'});
    });
});

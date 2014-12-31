'use strict';

var marshalString = require('../../lib/commands/marshalString'),
    withData = require('leche').withData,
    should = require('should');

describe('marshalString', function() {

    withData({
        'empty string': [''],
        'non string value': [{}]
    }, function(item) {
        it('should return undefined', function() {
            var result = marshalString(item);
            (result === undefined).should.equal(true);
        });
    });

    it('should marshal item to dynamoDb "S" format', function() {
        marshalString('foo').should.eql({S: 'foo'});
    });
});

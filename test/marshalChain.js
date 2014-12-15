'use strict';

var marshalChain = require('../lib/marshalChain'),
    should = require('should'),
    leche = require('leche'),
    withData = leche.withData;

describe('marshalChain', function() {
    describe('marshal', function() {
        withData({
            'a string item': ['bar', {S: 'bar'}],
            'a number item': [42, {N: '42'}],
            'a boolean false item': [false, {BOOL: false}],
            'a boolean true item': [true, {BOOL: true}],
            'a null item': [null, {NULL: true}],
            'an undefined item': [undefined, {NULL: true}],
            'a variable list item': [['bar', 42, null], {L: [{S: 'bar'}, {N: '42'}, {NULL: true}]}],
            'an object item': [{str: 'bar', num: 42, blank: null}, {M: {str: {S: 'bar'}, num: {N: '42'}, blank: {NULL: true}}}]
        }, function(item, expected) {
            it('should marshal to dynamoDb format', function() {
                marshalChain.marshal(item).should.eql(expected);
            });
        });
    });
});

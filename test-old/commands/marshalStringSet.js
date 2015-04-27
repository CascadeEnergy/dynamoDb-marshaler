'use strict';

var marshalStringSet = require('../../lib/commands/marshalStringSet');
var should = require('should');
var withData = require('leche').withData;

describe('marshalStringSet', function() {
  withData({
    'a non array': [{}],
    'an empty array': [[]],
    'an array that is not all strings': [[42, 'foo']],
    'an array with duplicates': [['foo', 'bar', 'foo']]
  }, function(item) {
    it('should return undefined', function() {
      var result = marshalStringSet(item);
      (result === undefined).should.eql(true);
    });
  });

  it('should marshal item to dynamoDb "SS" format', function() {
    marshalStringSet(['foo', 'bar']).should.eql({SS: ['foo', 'bar']});
  });
});

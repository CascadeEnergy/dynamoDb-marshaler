'use strict';

var unmarshalPassThrough = require('../../lib/commands/unmarshalPassThrough');
var withData = require('leche').withData;

describe('unmarshalPassThrough', function() {
  it(
    'should return undefined if item does not contain a key which is a ' +
    'pass through type',
    function() {
      var result = unmarshalPassThrough({FOO: 'bar'});
      (result === undefined).should.equal(true);
    }
  );

  withData({
    'an "S" item': [{S: 'foo'}, 'foo'],
    'an "SS" item': [{SS: ['foo', 'bar']}, ['foo', 'bar']],
    'a "B" item': [{B: 'binary'}, 'binary'],
    'a "BS" item': [{BS: ['binary1', 'binary2']}, ['binary1', 'binary2']],
    'a "BOOL" item': [{BOOL: true}, true]
  }, function(item, expected) {
    it('should return the value for the pass through key', function() {
      unmarshalPassThrough(item).should.eql(expected);
    });
  });
});

'use strict';

var unmarshalPassThrough = require('../../lib/commands/unmarshalPassThrough'),
  withData = require('leche').withData;

describe('unmarshalPassThrough', function () {
  it(
    'should return undefined if item does not contain a key which is a ' +
    'pass through type',
    function () {
      var result = unmarshalPassThrough({FOO: 'bar'});
      (result === undefined).should.equal(true);
    }
  );

  withData({
    'with an "S" item': [{S: 'foo'}, 'foo'],
    'with "SS" item': [{SS: ['foo', 'bar']}, ['foo', 'bar']],
    'with "B" item': [{B: 'binary'}, 'binary'],
    'with "BS" item': [{BS: ['binary1', 'binary2']}, ['binary1', 'binary2']],
    'with "BOOL" item': [{BOOL: true}, true]
  }, function (item, expected) {
    it('should return the value for the pass through key', function () {
      unmarshalPassThrough(item).should.eql(expected);
    });
  });
});

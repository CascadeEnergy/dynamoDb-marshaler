'use strict';

var marshalList = require('../../lib/commands/marshalList');
var should = require('should');
var marshal = function(item) {
  return item + ' marshaled';
};

describe('marshalList', function() {

  it('should return undefined if item is not an Array', function() {
    var result = marshalList({}, marshal);
    (result === undefined).should.equal(true);
  });

  it(
    'should marshal each list item to the proper dynamoDb format',
    function() {
      var item = [42, 'foo', null];
      var marshaledItem = ['42 marshaled', 'foo marshaled', 'null marshaled'];
      var expected = {L: marshaledItem};

      marshalList(item, marshal).should.eql(expected);
    }
  );
});

'use strict';

var marshalMap = require('../../lib/commands/marshalMap');
var should = require('should');
var sinon = require('sinon');

var marshal = function (item) {
  return item + ' marshaled';
};

describe('marshalMap', function () {
  var marshal;

  beforeEach(function () {
    marshal = sinon.stub();
  });

  it('should return undefined if item is not a plain object', function () {
    var result = marshalMap([], marshal);
    (result === undefined).should.equal(true);
  });

  it(
    'should marshal each Map value to the proper dynamoDb format',
    function () {
      var item = {foo: 'bar', num: 42};
      var marshaledItem = {foo: 'bar marshaled', num: '42 marshaled'};
      var expected = {M: marshaledItem};

      marshal.withArgs('bar').returns('bar marshaled');
      marshal.withArgs(42).returns('42 marshaled');

      marshalMap(item, marshal).should.eql(expected);

      marshal.calledTwice.should.equal(true);
      marshal.args[0].should.eql(['bar']);
      marshal.args[1].should.eql([42]);
    }
  );
});

'use strict';

var marshalList = require('../../lib/commands/marshalList');
var sinon = require('sinon');
var should = require('should');

describe('marshalList', function() {
  var marshal;

  beforeEach(function() {
    marshal = sinon.stub();
  });

  it('should return undefined if item is not an Array', function() {
    var result = marshalList({}, marshal);

    marshal.callCount.should.equal(0);
    (result === undefined).should.equal(true);
  });

  it(
    'should marshal each list item to the proper dynamoDb format',
    function() {
      var item = [42, 'foo', null];
      var result;

      marshal.onFirstCall().returns('42 marshaled');
      marshal.onSecondCall().returns('foo marshaled');
      marshal.onThirdCall().returns('null marshaled');

      result = marshalList(item, marshal);

      marshal.calledThrice.should.equal(true);
      should(marshal.args[0][0]).eql(42);
      should(marshal.args[1][0]).eql('foo');
      should(marshal.args[2][0]).eql(null);

      result.should.eql({
        L: [
          '42 marshaled',
          'foo marshaled',
          'null marshaled'
        ]
      });
    }
  );

  it('should marshal empty arrays to an empty list', function() {
    var item = [];
    var result = marshalList(item, marshal);
    marshal.callCount.should.equal(0);
    result.should.eql({L: []});
  });
});

'use strict';

var sinon = require('sinon');
var should = require('should');
var unmarshalList = require('../../lib/commands/unmarshalList');

describe('unmarshalList', function() {
  var unmarshal;

  beforeEach(function() {
    unmarshal = sinon.stub();
  });

  it('should return undefined if the item does not have "L" key', function() {
    var result = unmarshalList({S: 'foo'}, unmarshal);
    unmarshal.callCount.should.equal(0);
    (result === undefined).should.equal(true);
  });

  it(
    'should unmarshal the list, and unmarshal each value in the list',
    function() {
      var result;

      unmarshal.onFirstCall().returns('foo unmarshaled');
      unmarshal.onSecondCall().returns('bar unmarshaled');

      result = unmarshalList({L: ['foo', 'bar']}, unmarshal);

      unmarshal.calledTwice.should.equal(true);
      unmarshal.args[0][0].should.eql('foo');
      unmarshal.args[1][0].should.eql('bar');

      result.should.eql([
        'foo unmarshaled',
        'bar unmarshaled'
      ]);
    });
});

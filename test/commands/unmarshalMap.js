'use strict';

var unmarshalMap = require('../../lib/commands/unmarshalMap');
var unmarshal = function (item) {
  return item + ' unmarshaled';
};

describe('unmarshalMap', function () {
  it('should return undefined if item does not have "M" property', function () {
    var result = unmarshalMap('foo', unmarshal);
    (result === undefined).should.equal(true);
  });

  it(
    'should unmarshal each attribute of the map and return a' +
    'unmarshaled object',
    function () {
      var item = {M: {foo: 'FOOOBJ', bar: 'BAROBJ'}};
      var expected = {foo: 'FOOOBJ unmarshaled', bar: 'BAROBJ unmarshaled'};
      var result;

      result = unmarshalMap(item, unmarshal);
      result.should.eql(expected);
    }
  );
});

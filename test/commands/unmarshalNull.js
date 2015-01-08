'use strict';

var unmarshalNull = require('../../lib/commands/unmarshalNull');

describe('unmarshalNull', function() {
  it(
    'should return undefined if item does not have "NULL" property',
    function() {
      var result = unmarshalNull('foo');
      (result === undefined).should.equal(true);
    }
  );

  it(
    'should unmarshal each attribute of the map and return ' +
    'a unmarshaled object',
    function() {
      var result = unmarshalNull({NULL: true});
      (result === null).should.eql(true);
    }
  );
});

'use strict';

var unmarshalNumberSet = require('../../lib/commands/unmarshalNumberSet');

describe('unmarshalNumberSet', function() {
  it('should return undefined if item does not have "NS" key', function() {
    var result = unmarshalNumberSet({S: 'foo'});
    (result === undefined).should.equal(true);
  });

  it(
    'should convert each number in the number set to a real javascript Number',
    function() {
      unmarshalNumberSet({NS: ["42", "42.42"]}).should.eql([42, 42.42]);
    }
  );
});

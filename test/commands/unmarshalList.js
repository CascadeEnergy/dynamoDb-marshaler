'use strict';

var unmarshalList = require('../../lib/commands/unmarshalList'),
    unmarshal = function(item) {
        return item + ' unmarshaled';
    };

describe('unmarshalList', function() {
    it('should return undefined if the item does not have "L" key', function() {
        var result = unmarshalList({S: 'foo'}, unmarshal);
        (result === undefined).should.equal(true);
    });

    it('should unmarshal the list, and unmarshal each value in the list', function() {
        unmarshalList({L: ["FOOOBJ", "BAROBJ"]}, unmarshal).should.eql(["FOOOBJ unmarshaled", "BAROBJ unmarshaled"]);
    });
});

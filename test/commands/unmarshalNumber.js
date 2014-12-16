'use strict';

var unmarshalNumber = require('../../lib/commands/unmarshalNumber');

describe('unmarshalNumber', function() {
    it('should return undefined if item does not have "N" key', function() {
        var result = unmarshalNumber({S: 'foo'});
        (result === undefined).should.equal(true);
    });

    it('should return the parseFloat value of the number representation', function() {
        unmarshalNumber({N: '42.42'}).should.equal(42.42);
    });
});

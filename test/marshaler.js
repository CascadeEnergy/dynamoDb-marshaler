'use strict';

var marshaler = require('../lib/marshaler');

describe('marshaler', function() {
    describe('marshalItem()', function() {
        it ('should marshal item', function() {
            //var item = {
            //    myString: 'foo',
            //    myNum: 42,
            //    myBool: true,
            //    myUndefined: undefined,
            //    myList: [
            //        'bar',
            //        42,
            //        null
            //    ]
            //};

            var item = ['bar', 42, null];

            console.log(marshaler.marshalItem(item));
        });
    });
});

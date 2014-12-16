'use strict';

var proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    marshalString = sinon.stub(),
    marshalNumber = sinon.stub(),
    marshalBoolean = sinon.stub(),
    marshalNull = sinon.stub(),
    marshalStringSet = sinon.stub(),
    marshalNumberSet = sinon.stub(),
    marshalList = sinon.stub(),
    marshalMap = sinon.stub(),
    unmarshalPassThrough = sinon.stub(),
    marshalService = proxyquire('../lib/marshalService', {
        './commands/marshalString': marshalString,
        './commands/marshalNumber': marshalNumber,
        './commands/marshalBoolean': marshalBoolean,
        './commands/marshalNull': marshalNull,
        './commands/marshalStringSet': marshalStringSet,
        './commands/marshalNumberSet': marshalNumberSet,
        './commands/marshalList': marshalList,
        './commands/marshalMap': marshalMap,
        './commands/unmarshalPassThrough': unmarshalPassThrough
    });

describe('marshalService', function() {
    describe('marshal()', function() {
        it('should only be formatted by first command which accepts the value, after which the loop is exited.', function() {
            var item = 42,
                result;

            marshalString.withArgs(item, marshalService.marshal).returns(undefined);
            marshalNumber.withArgs(item, marshalService.marshal).returns({N: '42'});

            result = marshalService.marshal(item);

            marshalString.calledOnce.should.equal(true);
            marshalNumber.calledOnce.should.equal(true);
            // exits early after marshalNumber handles the item.
            marshalBoolean.callCount.should.equal(0);
            marshalNull.callCount.should.equal(0);
            marshalStringSet.callCount.should.equal(0);
            marshalNumberSet.callCount.should.equal(0);
            marshalList.callCount.should.equal(0);
            marshalMap.callCount.should.equal(0);

            result.should.eql({N: '42'});
        });
    });

    describe('unmarshal()', function() {
        it('should only return the unmarshaled value returned by the first unmarshaler command which accepts the item', function() {
            var item = {foo: {S: 'bar'}},
                result;

            unmarshalPassThrough.withArgs(item, marshalService.unmarshal).returns('foo');

            result = marshalService.unmarshal(item);

            unmarshalPassThrough.calledOnce.should.equal(true);

            result.should.eql('foo');
        });
    });
});

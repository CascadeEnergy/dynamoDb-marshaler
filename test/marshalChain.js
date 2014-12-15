'use strict';

var marshalChain = require('../lib/marshalChain'),
    should = require('should'),
    sinon = require('sinon');

describe('MarshalChain', function() {
    var chain,
        alphaCommand = sinon.stub(),
        bravoCommand = sinon.stub(),
        charlieCommand = sinon.stub(),
        commandList = [alphaCommand, bravoCommand, charlieCommand];

    beforeEach(function() {
        chain = marshalChain(commandList);
    });

    it('should set commandList in constructor', function() {
        chain.commandList.should.equal(commandList);
    });

    describe('marshal()', function() {
        it('should only be formatted by first command which accepts the value, after which the loop is exited.', function() {
            var item = {},
                result;

            alphaCommand.withArgs(item, chain).returns(null);
            bravoCommand.withArgs(item, chain).returns({foo: 'bar'});

            result = chain.marshal(item);

            alphaCommand.calledOnce.should.equal(true);
            bravoCommand.calledOnce.should.equal(true);
            // exits early after bravoCommand handles the item.
            charlieCommand.callCount.should.equal(0);

            result.should.eql({foo: 'bar'});
        });
    });
});

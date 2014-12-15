'use strict';

var marshalChain = require('../lib/marshalChain'),
    should = require('should'),
    sinon = require('sinon');

describe('MarshalChain', function() {
    var chain,
        alphaCommand = sinon.stub(),
        bravoCommand = sinon.stub(),
        commandList = [alphaCommand, bravoCommand];

    beforeEach(function() {
        chain = marshalChain(commandList);
    });

    it('should set commandList in constructor', function() {
        chain.commandList.should.equal(commandList);
    });

    describe('marshal()', function() {
        it('should return a marshaled object by cycling through commands which convert item argument', function() {
            var item = {},
                result;

            alphaCommand.withArgs(item, chain).returns(null);
            bravoCommand.withArgs(item, chain).returns({foo: 'bar'});

            result = chain.marshal(item);

            alphaCommand.calledOnce.should.equal(true);
            bravoCommand.calledOnce.should.equal(true);
            result.should.eql({foo: 'bar'});
        });
    });
});

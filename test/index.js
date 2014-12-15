'use strict';

var proxyquire = require('proxyquire'),
    should = require('should'),
    sinon = require('sinon'),
    marshalChain = {
        marshal: sinon.stub()
    },
    marshaler = proxyquire('../index', {
        './lib/marshalChain': marshalChain
    });

describe('marshaler', function() {
    describe('marshalItem()', function() {
        it('should throw TypeError if item passed in is not an object literal', function() {
            marshaler.marshalItem.bind(null, 'foo').should.throw(TypeError, {message: 'Item must be plain object literal'});
        });

        it('should delegate to marshalChain.marshal to convert item to dynamoDb format', function() {
            var item = {},
                expected = {},
                marshaledItem = {M: expected},
                actual;

            marshalChain.marshal.withArgs(item).returns(marshaledItem);

            actual = marshaler.marshalItem(item);

            marshalChain.marshal.calledOnce.should.equal(true);

            actual.should.eql(expected);
        });
    });

    describe('marshalJson()', function() {
        it('should parse a json string and delegate to marshalChain.marshal', function() {
            var json = '{\"foo\": \"bar\"}',
                parsedItem = {foo: 'bar'},
                marshaledItem = {foo: {S: 'bar'}},
                marshalItemStub = sinon.stub(marshaler, 'marshalItem'),
                result;

            marshalItemStub.withArgs(parsedItem).returns(marshaledItem);

            result = marshaler.marshalJson(json);

            marshalItemStub.calledOnce.should.equal(true);

            result.should.eql(marshaledItem);
        });
    });
});

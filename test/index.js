'use strict';

var proxyquire = require('proxyquire'),
    should = require('should'),
    sinon = require('sinon'),
    marshalService = {
        marshal: function () {},
        unmarshal: function() {}
    };

var sut = proxyquire('../index', {
    './lib/marshalService': marshalService
});

describe('marshaler', function() {
    var marshalStub,
        unmarshalStub;

    beforeEach(function() {
        marshalStub = sinon.stub(marshalService, 'marshal');
        unmarshalStub = sinon.stub(marshalService, 'unmarshal');
    });

    afterEach(function() {
        marshalStub.restore();
        unmarshalStub.restore();
    });

    describe('marshalJson()', function() {
        it('should throw TypeError if item passed in is not an object literal', function() {
            sut.marshalItem.bind(null, 'foo').should.throw(TypeError, {message: 'Item must be plain object literal'});
        });

        it('should delegate to marshalService.marshal to convert item to dynamoDb format', function() {
            var item = {},
                expected = {},
                marshaledItem = {M: expected},
                actual;

            marshalStub.withArgs(item).returns(marshaledItem);

            actual = sut.marshalItem(item);

            marshalStub.calledOnce.should.equal(true);

            actual.should.eql(expected);
        });
    });

    describe('marshalJson()', function() {
        it('should parse a json string and delegate to marshalItem', function() {
            var json = '{\"foo\": \"bar\"}',
                item = {foo: 'bar'},
                expected = {},
                marshaledItem = {M: expected},
                actual;

            marshalStub.withArgs(item).returns(marshaledItem);

            actual = sut.marshalJson(json);

            marshalStub.calledOnce.should.equal(true);

            actual.should.eql(expected);
        });
    });
});

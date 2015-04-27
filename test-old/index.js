'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var sinon = require('sinon');
var marshalService = {
  marshal: function() {},
  unmarshal: function() {}
};

var sut = proxyquire('../index', {
  './lib/marshalService': marshalService
});

describe('marshaler', function() {
  var marshalStub;
  var unmarshalStub;

  beforeEach(function() {
    marshalStub = sinon.stub(marshalService, 'marshal');
    unmarshalStub = sinon.stub(marshalService, 'unmarshal');
  });

  afterEach(function() {
    marshalStub.restore();
    unmarshalStub.restore();
  });

  describe('marshalJson()', function() {
    it(
      'should throw TypeError if item passed in is not an object literal',
      function() {
        sut
          .marshalItem
          .bind(null, 'foo')
          .should.throw(
            TypeError,
            {message: 'Item must be plain object literal'}
          );
      }
    );

    it(
      'should delegate to marshalService.marshal to convert item to ' +
      'dynamoDb format',
      function() {
        var item = {};
        var expected = {};
        var marshaledItem = {M: expected};
        var actual;

        marshalStub.withArgs(item).returns(marshaledItem);

        actual = sut.marshalItem(item);

        marshalStub.calledOnce.should.equal(true);

        actual.should.equal(expected);
      }
    );
  });

  describe('marshalJson()', function() {
    it('should parse a json string and delegate to marshalItem', function() {
      var json = '{\"foo\": \"bar\"}';
      var item = {foo: 'bar'};
      var expected = {};
      var marshaledItem = {M: expected};
      var actual;

      marshalStub.withArgs(item).returns(marshaledItem);

      actual = sut.marshalJson(json);

      marshalStub.calledOnce.should.equal(true);

      actual.should.equal(expected);
    });
  });

  describe('unmarshalItem()', function() {
    it(
      'should throw TypeError if item passed in is not an object literal',
      function() {
        sut
          .unmarshalItem
          .bind(null, 'foo')
          .should
          .throw(TypeError, {message: 'Item must be plain object literal'});
      }
    );

    it(
      'should delegate to marshalService.unmarshal to convert dynamoDb ' +
      'format object to normal object',
      function() {
        var item = {};
        var unmarshaledItem = {};
        var actual;

        unmarshalStub.withArgs({M: item}).returns(unmarshaledItem);

        actual = sut.unmarshalItem(item);

        unmarshalStub.calledOnce.should.equal(true);

        actual.should.equal(unmarshaledItem);
      }
    );
  });

  describe('unmarshalJson()', function() {
    it(
      'should take a javascript object, unmarshal it and stringify it as json',
      function() {
        var item = {};
        var unmarshaledItem = {};
        var actual;

        unmarshalStub.withArgs({M: item}).returns(unmarshaledItem);

        actual = sut.unmarshalJson(item);

        unmarshalStub.calledOnce.should.equal(true);

        actual.should.eql(JSON.stringify(unmarshaledItem));
      }
    );
  });
});

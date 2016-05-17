'use strict';

var assert = require('assert');
var withData = require('leche').withData;
var marshaler = require('../');

describe('dynamodb-marshaler', function() {
  withData([
    ['marshal'],
    ['unmarshal'],
    ['marshalItem'],
    ['marshalJson'],
    ['toDDB'],
    ['toJS'],
    ['unmarshalItem'],
    ['unmarshalJson']
  ], function(method) {
    it('should have method ' + method, function() {
      assert.ok(typeof marshaler[method] === 'function');
    });
  });

  it('should alias marshalItem to toDDB method', function() {
    assert.strictEqual(marshaler.marshalItem, marshaler.toDDB);
  });

  it('should alias unmarshalItem to toJS method', function() {
    assert.strictEqual(marshaler.unmarshalItem, marshaler.toJS);
  });

  describe('marshal', function() {
    withData({
      'boolean false to dynamo "BOOL"': [
        false,
        {BOOL: false}
      ],
      'boolean true to dynamo "BOOL"': [
        true,
        {BOOL: true}
      ],
      'mixed array to dynamo "L"': [
        [42, 'foo', null],
        {L: [{N: '42'}, {S: 'foo'}, {NULL: true}]}
      ],
      'object to dynamo "MAP"': [
        {foo: 'bar', num: 42},
        {M: {foo: {S: 'bar'}, num: {N: '42'}}}
      ],
      'null to dynamo "NULL"': [
        null,
        {NULL: true}
      ],
      'number to dynamo "N"': [
        42,
        {N: '42'}
      ],
      'homogeneous number array to dynamo "NS"': [
        [42, 17, 25],
        {NS: ['42', '17', '25']}
      ],
      'string to dynamo "S"': [
        'foo',
        {S: 'foo'}
      ],
      'homogeneous string array to dynamo "SS"': [
        ['foo', 'bar', 'baz'],
        {SS: ['foo', 'bar', 'baz']}
      ]
    }, function(value, expected) {
      it(
        'should marshal individual value to DynamoDb AttributeValue',
        function() {
          assert.deepEqual(marshaler.marshal(value), expected);
        }
      );
    });
  });

  describe('unmarshal', function() {
    withData({
      'dynamo "BOOL" to false': [
        {BOOL: false},
        false
      ],
      'dynamo "BOOL" to true': [
        {BOOL: true},
        true
      ],
      'dynamo "L" to mixed array': [
        {L: [{N: '42'}, {S: 'foo'}, {NULL: true}]},
        [42, 'foo', null]
      ],
      'dynamo "M" to object': [
        {M: {foo: {S: 'bar'}, num: {N: '42'}}},
        {foo: 'bar', num: 42}
      ],
      'dynamo "NULL" to null': [
        {NULL: true},
        null
      ],
      'dynamo "N" to number': [
        {N: '42'},
        42
      ],
      'dynamo "NS" to Set of numbers': [
        {NS: ['42', '17', '25']},
        [42, 17, 25]
      ],
      'dynamo "S" to string': [
        {S: 'foo'},
        'foo'
      ],
      'dynamo "SS" to Set of strings': [
        {SS: ['foo', 'bar', 'baz']},
        ['foo', 'bar', 'baz']
      ]
    }, function(value, expected) {
      it('should convert successfully', function() {
        assert.deepEqual(marshaler.unmarshal(value), expected);
      });
    });

    it('should throw type error if given invalid item', function() {
      function harness() {
        marshaler.unmarshal({FOO: true});
      }

      assert.throws(harness, /Encountered unexpected item/);
    });
  });

  describe('marshalItem', function() {
    it('should marshal object successfully', function() {
      var item = {
        foo: 'bar',
        beep: false,
        bagel: ['cream cheese', 'onion']
      };
      var expected = {
        foo: {S: 'bar'},
        beep: {BOOL: false},
        bagel: {SS: ['cream cheese', 'onion']}
      };

      assert.deepEqual(marshaler.marshalItem(item), expected);
    });

    it('should throw type error if given invalid item', function() {
      function harness() {
        function MyObj() {}
        marshaler.marshalItem({test: new MyObj()});
      }

      assert.throws(harness, /Encountered unexpected item/);
    });
  });

  describe('unmarshalItem', function() {
    it('should unmarshal object successfully', function() {
      var item = {
        foo: {S: 'bar'},
        beep: {BOOL: false},
        bagel: {SS: ['cream cheese', 'onion']}
      };
      var expected = {
        foo: 'bar',
        beep: false,
        bagel: ['cream cheese', 'onion']
      };

      assert.deepEqual(marshaler.unmarshalItem(item), expected);
    });

    it('should throw type error if given invalid item', function() {
      function harness() {
        marshaler.unmarshalItem({FOO: true});
      }

      assert.throws(harness, /Encountered unexpected item/);
    });
  });

  describe('marshalJson', function() {
    it('should translate JSON string into a DynamoDb object', function() {
      var json = '{"foo":"bar","numbers":[42,17,25]}';
      var expectedItem = {
        foo: {S: 'bar'},
        numbers: {NS: ['42', '17', '25']}
      };

      assert.deepEqual(marshaler.marshalJson(json), expectedItem);
    });
  });

  describe('unmarshalJson', function() {
    it(
      'should translate DynamoDB object into a standard JSON string',
      function() {
        var item = {
          foo: {S: 'bar'},
          numbers: {NS: ['42', '17', '25']}
        };
        var expected = '{"foo":"bar","numbers":[42,17,25]}';
        assert.equal(marshaler.unmarshalJson(item), expected);
      }
    );
  });
});

'use strict';

var _Set = require('babel-runtime/core-js/set')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _withData = require('leche');

var _marshaler = require('../dynamodb-marshaler');

var _marshaler2 = _interopRequireDefault(_marshaler);

describe('dynamodb-marshaler', function () {
  _withData.withData([['marshal'], ['unmarshal'], ['marshalItem'], ['marshalJson'], ['toDDB'], ['toJS'], ['unmarshalItem'], ['unmarshalJson']], function (method) {
    it('should have method ' + method, function () {
      _assert2['default'].ok(typeof _marshaler2['default'][method] === 'function');
    });
  });

  it('should alias marshalItem to toDDB method', function () {
    _assert2['default'].strictEqual(_marshaler2['default'].marshalItem, _marshaler2['default'].toDDB);
  });

  it('should alias unmarshalItem to toJS method', function () {
    _assert2['default'].strictEqual(_marshaler2['default'].unmarshalItem, _marshaler2['default'].toJS);
  });

  describe('marshal', function () {
    var numberSet = new _Set();
    numberSet.add(42);
    numberSet.add(17);
    numberSet.add(25);

    var stringSet = new _Set();
    stringSet.add('foo');
    stringSet.add('bar');
    stringSet.add('baz');

    _withData.withData({
      'boolean false to dynamo "BOOL"': [false, { BOOL: false }],
      'boolean true to dynamo "BOOL"': [true, { BOOL: true }],
      'mixed array to dynamo "L"': [[42, 'foo', null], { L: [{ N: '42' }, { S: 'foo' }, { NULL: true }] }],
      'object to dynamo "MAP"': [{ foo: 'bar', num: 42 }, { M: { foo: { S: 'bar' }, num: { N: '42' } } }],
      'null to dynamo "NULL"': [null, { NULL: true }],
      'number to dynamo "N"': [42, { N: '42' }],
      'homogeneous number array to dynamo "NS"': [[42, 17, 25], { NS: ['42', '17', '25'] }],
      'Set of numbers to dynamo "NS"': [numberSet, { NS: ['42', '17', '25'] }],
      'string to dynamo "S"': ['foo', { S: 'foo' }],
      'homogeneous string array to dynamo "SS"': [['foo', 'bar', 'baz'], { SS: ['foo', 'bar', 'baz'] }],
      'Set of strings to dynamo "SS"': [stringSet, { SS: ['foo', 'bar', 'baz'] }]
    }, function (value, expected) {
      it('should marshal individual value to DynamoDb AttributeValue', function () {
        _assert2['default'].deepEqual(_marshaler2['default'].marshal(value), expected);
      });
    });
  });

  describe('unmarshal', function () {
    _withData.withData({
      'dynamo "BOOL" to false': [{ BOOL: false }, false],
      'dynamo "BOOL" to true': [{ BOOL: true }, true],
      'dynamo "L" to mixed array': [{ L: [{ N: '42' }, { S: 'foo' }, { NULL: true }] }, [42, 'foo', null]],
      'dynamo "M" to object': [{ M: { foo: { S: 'bar' }, num: { N: '42' } } }, { foo: 'bar', num: 42 }],
      'dynamo "NULL" to null': [{ NULL: true }, null],
      'dynamo "N" to number': [{ N: '42' }, 42],
      'dynamo "NS" to Set of numbers': [{ NS: ['42', '17', '25'] }, [42, 17, 25]],
      'dynamo "S" to string': [{ S: 'foo' }, 'foo'],
      'dynamo "SS" to Set of strings': [{ SS: ['foo', 'bar', 'baz'] }, ['foo', 'bar', 'baz']]
    }, function (value, expected) {
      it('should convert successfully', function () {
        _assert2['default'].deepEqual(_marshaler2['default'].unmarshal(value), expected);
      });
    });

    it('should throw type error if given invalid item', function () {
      function harness() {
        _marshaler2['default'].unmarshal({ FOO: true });
      }

      _assert2['default'].throws(harness, /Encountered unexpected item/);
    });
  });

  describe('marshalItem', function () {
    it('should marshal object successfully', function () {
      var item = {
        foo: 'bar',
        beep: false,
        bagel: ['cream cheese', 'onion']
      };
      var expected = {
        foo: { S: 'bar' },
        beep: { BOOL: false },
        bagel: { SS: ['cream cheese', 'onion'] }
      };

      _assert2['default'].deepEqual(_marshaler2['default'].marshalItem(item), expected);
    });

    it('should throw type error if given invalid item', function () {
      function harness() {
        function MyObj() {}
        _marshaler2['default'].marshalItem({ test: new MyObj() });
      }

      _assert2['default'].throws(harness, /Encountered unexpected item/);
    });
  });

  describe('unmarshalItem', function () {
    it('should unmarshal object successfully', function () {
      var item = {
        foo: { S: 'bar' },
        beep: { BOOL: false },
        bagel: { SS: ['cream cheese', 'onion'] }
      };
      var expected = {
        foo: 'bar',
        beep: false,
        bagel: ['cream cheese', 'onion']
      };

      _assert2['default'].deepEqual(_marshaler2['default'].unmarshalItem(item), expected);
    });

    it('should throw type error if given invalid item', function () {
      function harness() {
        _marshaler2['default'].unmarshalItem({ FOO: true });
      }

      _assert2['default'].throws(harness, /Encountered unexpected item/);
    });
  });

  describe('marshalJson', function () {
    it('should translate JSON string into a DynamoDb object', function () {
      var json = '{"foo":"bar","numbers":[42,17,25]}';
      var expectedItem = {
        foo: { S: 'bar' },
        numbers: { NS: ['42', '17', '25'] }
      };

      _assert2['default'].deepEqual(_marshaler2['default'].marshalJson(json), expectedItem);
    });
  });

  describe('unmarshalJson', function () {
    it('should translate DynamoDB object into a standard JSON string', function () {
      var item = {
        foo: { S: 'bar' },
        numbers: { NS: ['42', '17', '25'] }
      };
      var expected = '{"foo":"bar","numbers":[42,17,25]}';
      _assert2['default'].equal(_marshaler2['default'].unmarshalJson(item), expected);
    });
  });
});
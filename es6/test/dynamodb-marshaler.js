import assert from 'assert';
import {withData} from 'leche';
import marshaler from '../dynamodb-marshaler';

describe('dynamodb-marshaler', () => {
  withData([
    ['marshal'],
    ['unmarshal'],
    ['marshalItem'],
    ['marshalJson'],
    ['toDDB'],
    ['toJS'],
    ['unmarshalItem'],
    ['unmarshalJson']
  ], (method) => {
    it(`should have method ${method}`, () => {
      assert.ok(typeof marshaler[method] === 'function');
    });
  });

  it('should alias marshalItem to toDDB method', () => {
    assert.strictEqual(marshaler.marshalItem, marshaler.toDDB);
  });

  it('should alias unmarshalItem to toJS method', () => {
    assert.strictEqual(marshaler.unmarshalItem, marshaler.toJS);
  });

  describe('marshal', () => {
    const numberSet = new Set();
    numberSet.add(42);
    numberSet.add(17);
    numberSet.add(25);

    const stringSet = new Set();
    stringSet.add('foo');
    stringSet.add('bar');
    stringSet.add('baz');

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
      'Set of numbers to dynamo "NS"': [
        numberSet,
        {NS: ['42', '17', '25']}
      ],
      'string to dynamo "S"': [
        'foo',
        {S: 'foo'}
      ],
      'homogeneous string array to dynamo "SS"': [
        ['foo', 'bar', 'baz'],
        {SS: ['foo', 'bar', 'baz']}
      ],
      'Set of strings to dynamo "SS"': [
        stringSet,
        {SS: ['foo', 'bar', 'baz']}
      ]
    }, (value, expected) => {
      it('should marshal individual value to DynamoDb AttributeValue', () => {
        assert.deepEqual(marshaler.marshal(value), expected);
      });
    });
  });

  describe('unmarshal', () => {
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
    }, (value, expected) => {
      it('should convert successfully', () => {
        assert.deepEqual(marshaler.unmarshal(value), expected);
      });
    });

    it('should throw type error if given invalid item', () => {
      function harness() {
        marshaler.unmarshal({FOO: true});
      }

      assert.throws(harness, /Encountered unexpected target/);
    });
  });

  describe('marshalItem', () => {
    it('should marshal object successfully', () => {
      const item = {
        foo: 'bar',
        beep: false,
        bagel: ['cream cheese', 'onion']
      };
      const expected = {
        foo: {S: 'bar'},
        beep: {BOOL: false},
        bagel: {SS: ['cream cheese', 'onion']}
      };

      assert.deepEqual(marshaler.marshalItem(item), expected);
    });

    it('should throw type error if given invalid item', () => {
      function harness() {
        function MyObj() {}
        marshaler.marshalItem({test: new MyObj()});
      }

      assert.throws(harness, /Encountered unexpected target/);
    });
  });

  describe('unmarshalItem', () => {
    it('should unmarshal object successfully', () => {
      const item = {
        foo: {S: 'bar'},
        beep: {BOOL: false},
        bagel: {SS: ['cream cheese', 'onion']}
      };
      const expected = {
        foo: 'bar',
        beep: false,
        bagel: ['cream cheese', 'onion']
      };

      assert.deepEqual(marshaler.unmarshalItem(item), expected);
    });

    it('should throw type error if given invalid item', () => {
      function harness() {
        marshaler.unmarshalItem({FOO: true});
      }

      assert.throws(harness, /Encountered unexpected target/);
    });
  });

  describe('marshalJson', () => {
    it('should translate JSON string into a DynamoDb object', () => {
      const json = '{"foo":"bar","numbers":[42,17,25]}';
      const expectedItem = {
        foo: {S: 'bar'},
        numbers: {NS: ['42', '17', '25']}
      };

      assert.deepEqual(marshaler.marshalJson(json), expectedItem);
    });
  });

  describe('unmarshalJson', () => {
    it('should translate DynamoDB object into a standard JSON string', () => {
      const item = {
        foo: {S: 'bar'},
        numbers: {NS: ['42', '17', '25']}
      };
      const expected = '{"foo":"bar","numbers":[42,17,25]}';
      assert.equal(marshaler.unmarshalJson(item), expected);
    });
  });
});

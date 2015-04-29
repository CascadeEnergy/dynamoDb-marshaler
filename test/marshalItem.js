import assert from 'assert';
import sinon from 'sinon';
import {withData} from 'leche';
import marshalItem from '../src/marshalItem';

describe('marshalItem', () => {
  let numberSet = new Set();
  numberSet.add(42);
  numberSet.add(17);
  numberSet.add(25);

  let stringSet = new Set();
  stringSet.add('foo');
  stringSet.add('bar');
  stringSet.add('baz');

  withData({
    'boolean true to dynamo "BOOL"': [
      {test: false},
      {test: {BOOL: false}}
    ],
    'boolean false to dynamo "BOOL"': [
      {test: true},
      {test: {BOOL: true}}
    ],
    'mixed array to dynamo "L"': [
      {test: [42, 'foo', null]},
      {test: {L: [{N: '42'}, {S: 'foo'}, {NULL: true}]}}
    ],
    'object to dynamo "MAP"': [
      {test: {foo: 'bar', num: 42}},
      {test: {M: {foo: {S: 'bar'}, num: {N: '42'}}}}
    ],
    'null to dynamo "NULL"': [
      {test: null},
      {test: {NULL: true}}
    ],
    'number to dynamo "N"': [
      {test: 42},
      {test: {N: '42'}}
    ],
    'homogeneous number array to dynamo "NS"': [
      {test: [42, 17, 25]},
      {test: {NS: ['42', '17', '25']}}
    ],
    'Set of numbers to dynamo "NS"': [
      {test: numberSet},
      {test: {NS: ['42', '17', '25']}}
    ],
    'string to dynamo "S"': [
      {test: 'foo'},
      {test: {S: 'foo'}}
    ],
    'homogeneous string array to dynamo "SS"': [
      {test: ['foo', 'bar', 'baz']},
      {test: {SS: ['foo', 'bar', 'baz']}}
    ],
    'Set of strings to dynamo "SS"': [
      {test: stringSet},
      {test: {SS: ['foo', 'bar', 'baz']}}
    ]
  }, (item, expected) => {
    it('should convert successfully', () => {
      assert.deepEqual(marshalItem(item), expected);
    });
  });

  it('should throw type error if given invalid item', () => {
    function harness() {
      function MyObj() {}
      console.log(marshalItem({test: new MyObj()}));
    }

    assert.throws(harness, /Marshaling error: encountered unexpected item/);
  });
});

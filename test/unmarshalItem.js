import assert from 'assert';
import sinon from 'sinon';
import {withData} from 'leche';
import unmarshalItem from '../src/unmarshalItem';

describe('unmarshalItem', () => {
  let numberSet = new Set();
  numberSet.add(42);
  numberSet.add(17);
  numberSet.add(25);

  let stringSet = new Set();
  stringSet.add('foo');
  stringSet.add('bar');
  stringSet.add('baz');

  withData({
    'dynamo "BOOL" to false': [
      {test: {BOOL: false}},
      {test: false}
    ],
    'dynamo "BOOL" to true': [
      {test: {BOOL: true}},
      {test: true}
    ],
    'dynamo "L" to mixed array': [
      {test: {L: [{N: '42'}, {S: 'foo'}, {NULL: true}]}},
      {test: [42, 'foo', null]}
    ],
    'dynamo "M" to object': [
      {test: {M: {foo: {S: 'bar'}, num: {N: '42'}}}},
      {test: {foo: 'bar', num: 42}}
    ],
    'dynamo "NULL" to null': [
      {test: {NULL: true}},
      {test: null}
    ],
    'dynamo "N" to number': [
      {test: {N: '42'}},
      {test: 42}
    ],
    'dynamo "NS" to Set of numbers': [
      {test: {NS: ['42', '17', '25']}},
      {test: numberSet}
    ],
    'dynamo "S" to string': [
      {test: {S: 'foo'}},
      {test: 'foo'}
    ],
    'dynamo "SS" to Set of strings': [
      {test: {SS: ['foo', 'bar', 'baz']}},
      {test: stringSet}
    ]
  }, (item, expected) => {
    it('should convert successfully', () => {
      assert.deepEqual(unmarshalItem(item), expected);
    });
  });

  it('should throw type error if given invalid item', () => {
    function harness() {
      unmarshalItem({FOO: true});
    }

    assert.throws(harness, /Unmarshal error: encountered unexpected item/);
  });
});

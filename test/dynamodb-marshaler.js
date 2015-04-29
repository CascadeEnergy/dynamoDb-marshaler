import assert from 'assert';
import {withData} from 'leche';
import marshaler from '../src/dynamodb-marshaler';

describe('dynamodb-marshaler', () => {
  withData([
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
});

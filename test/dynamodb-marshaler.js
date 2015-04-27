import marshaler from '../src/dynamodb-marshaler';
import assert from 'assert';

describe('helloBabel', () => {
  it('should have sayHello method', () => {
    assert.ok(typeof marshaler.sayHello === 'function');
  });
});

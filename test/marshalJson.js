import assert from 'assert';
import marshalJson from '../src/marshalJson';

describe('marshalJson', () => {
  it('should translate JSON string into a DynamoDb object', () => {
    let json = '{"foo":"foo","numbers":[42,17,25]}';
    let expectedItem = {
      foo: {S: 'foo'},
      numbers: {NS: ['42', '17', '25']}
    };
    assert.deepEqual(marshalJson(json), expectedItem);
  });
});

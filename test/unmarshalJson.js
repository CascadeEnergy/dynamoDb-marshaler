import assert from 'assert';
import unmarshalJson from '../src/unmarshalJson';

describe('unmarshalJson', () => {
  it('should translate DynamoDB object into a standard JSON string', () => {
    let item = {
      foo: {S: 'foo'},
      numbers: {NS: ['42', '17', '25']}
    };
    let expected = '{"foo":"foo","numbers":[42,17,25]}';
    assert.equal(unmarshalJson(item), expected);
  });
});

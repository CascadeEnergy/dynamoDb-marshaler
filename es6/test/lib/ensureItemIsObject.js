import assert from 'assert';
import sinon from 'sinon';
import ensureItemIsObject from '../../lib/ensureItemIsObject';

describe('ensureItemIsObject', () => {
  it('should return a function', () => {
    assert.ok(typeof ensureItemIsObject() === 'function');
  });

  it('should forward to underlying function if item is an object', () => {
    let spy = sinon.spy();
    let item = {};
    ensureItemIsObject(spy)(item);
    assert(spy.calledOnce);
    assert.equal(spy.args[0][0], item);
  });

  it('should throw a TypeError if item is not an object', () => {
    function harness() {
      ensureItemIsObject(() => {})('not.object');
    }

    assert.throws(harness, /Item must be plain object literal/);
  });
});

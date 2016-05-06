var assert = require('assert');
var sinon = require('sinon');
var ensureItemIsObject = require('../../lib/ensureItemIsObject');

describe('ensureItemIsObject', function() {
  it('should return a function', function() {
    assert.ok(typeof ensureItemIsObject() === 'function');
  });

  it('should forward to underlying function if item is an object', function() {
    var spy = sinon.spy();
    var item = {};
    ensureItemIsObject(spy)(item);
    assert(spy.calledOnce);
    assert.equal(spy.args[0][0], item);
  });

  it('should throw a TypeError if item is not an object', function() {
    function harness() {
      ensureItemIsObject(function() {})('not.object');
    }

    assert.throws(harness, /Item must be plain object literal/);
  });
});

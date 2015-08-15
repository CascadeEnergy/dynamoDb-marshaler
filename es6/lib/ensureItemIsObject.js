import {isPlainObject} from 'lodash';

/**
 * Function decorator, validates item is a javascript object.
 *
 * @param {Function} fn Underlying function to call.
 * @returns {Function}
 */
function ensureItemIsObject(fn) {
  return function(item) {
    if (isPlainObject(item)) {
      return fn(item);
    }
    throw new TypeError('Item must be plain object literal');
  };
}

export default ensureItemIsObject;

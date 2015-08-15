import isUndefined from 'lodash/lang/isUndefined';

/**
 * Recursive dispatcher, returns a function which iterates a series of commands
 * looking for one to handle the target and return a value. If the target
 * cannot be handled by a command the command returns undefined. If none of the
 * supplied commands handle the target, an error is thrown.
 *
 * @param commands
 * @returns {Function}
 */
function dispatcher(...commands) {
  return function dispatch(target) {
    let result;

    for (let command of commands) {
      result = command(target, dispatch);

      if (!isUndefined(result)) {
        break;
      }
    }

    if (isUndefined(result)) {
      throw new TypeError(`Encountered unexpected target`);
    }

    return result;
  };
}

export default dispatcher;

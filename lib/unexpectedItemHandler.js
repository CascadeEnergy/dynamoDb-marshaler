'use strict';

function unexpectedItemHandler() {
  throw new TypeError('Encountered unexpected item');
}

module.exports = unexpectedItemHandler;

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var helloBabel = {
  sayHello: function sayHello() {
    var subject = arguments[0] === undefined ? 'Babel' : arguments[0];

    console.log('hello ' + subject);
  }
};

exports['default'] = helloBabel;
module.exports = exports['default'];
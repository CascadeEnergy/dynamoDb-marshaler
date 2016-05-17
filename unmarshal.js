'use strict';

var dispatch = require('dispatch-recursive');
var unmarshalingCommands = require('./lib/unmarshalingCommands');

module.exports = dispatch.apply(undefined, unmarshalingCommands);

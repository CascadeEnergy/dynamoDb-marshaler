'use strict';

var dispatch = require('dispatch-recursive');
var marshalingCommands = require('./lib/marshalingCommands');

module.exports = dispatch.apply(undefined, marshalingCommands);

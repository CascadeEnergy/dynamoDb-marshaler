'use strict';

var _ = require('lodash');

var MarshalChain = function(commandList) {
    this.commandList = commandList;
};

_.assign(MarshalChain.prototype, {
    marshal: function(item) {
        var data = {};

        _.forEach(this.commandList, function(command) {
            var result = command.call(null, item, this);

            if (_.isNull(result)) {
                return;
            }

            _.assign(data, result);
        }, this);

        return data;
    }
});

module.exports = function(commandList) {
    return new MarshalChain(commandList);
};

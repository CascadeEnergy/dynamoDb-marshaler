var _ = require('lodash/fp');

module.exports = _.curry(function(predicate, transformer, item) {
    return predicate(item) ? transformer(item) : void 0;
});

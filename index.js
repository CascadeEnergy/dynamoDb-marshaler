'use strict';

var marshal = require('./marshal');
var marshalJson = require('./marshalJson');
var marshalItem = require('./marshalItem');
var unmarshal = require('./unmarshal');
var unmarshalItem = require('./unmarshalItem');
var unmarshalJson = require('./unmarshalJson');

module.exports = {
  marshal: marshal,
  marshalItem: marshalItem,
  marshalJson: marshalJson,
  toDDB: marshalItem,
  toJS: unmarshalItem,
  unmarshal: unmarshal,
  unmarshalItem: unmarshalItem,
  unmarshalJson: unmarshalJson
};

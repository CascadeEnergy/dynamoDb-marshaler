require('babel/polyfill');
import ensureItemIsObject from './lib/ensureItemIsObject';
import {toDDB} from './lib/converter';

function marshalItem(item) {
  var marshaledItem = toDDB(item);
  return marshaledItem.M;
}

export default ensureItemIsObject(marshalItem);

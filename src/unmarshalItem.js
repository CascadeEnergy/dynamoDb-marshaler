require('babel/polyfill');
import ensureItemIsObject from './lib/ensureItemIsObject';
import {toJS} from './lib/converter';

function unmarshalItem(item) {
  return toJS({M: item});
}

export default ensureItemIsObject(unmarshalItem);

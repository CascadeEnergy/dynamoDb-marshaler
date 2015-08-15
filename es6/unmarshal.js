import dispatcher from './lib/dispatcher';
import {unmarshalCommandList} from './lib/commands';

export default dispatcher(...unmarshalCommandList);

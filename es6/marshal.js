import dispatcher from './lib/dispatcher';
import {marshalCommandList} from './lib/commands';

export default dispatcher(...marshalCommandList);

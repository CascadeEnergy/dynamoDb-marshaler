import dispatch from 'dispatch-recursive';
import {unmarshalCommandList} from './lib/commands';

export default dispatch(...unmarshalCommandList);

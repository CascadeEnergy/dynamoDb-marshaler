import dispatch from 'dispatch-recursive';
import {marshalCommandList} from './lib/commands';

export default dispatch(...marshalCommandList);

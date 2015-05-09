import marshalItem from './marshalItem';
import marshalJson from './marshalJson';
import unmarshalItem from './unmarshalItem';
import unmarshalJson from './unmarshalJson';

let marshaler = {
  marshalItem,
  marshalJson,
  toDDB: marshalItem,
  toJS: unmarshalItem,
  unmarshalItem,
  unmarshalJson
};

export default marshaler;

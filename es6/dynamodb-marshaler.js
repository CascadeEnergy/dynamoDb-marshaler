import marshalItem from './marshalItem';
import marshalJson from './marshalJson';
import unmarshalItem from './unmarshalItem';
import unmarshalJson from './unmarshalJson';
import marshal from './marshal';
import unmarshal from './unmarshal';

const marshaler = {
  marshal,
  unmarshal,
  marshalItem,
  marshalJson,
  toDDB: marshalItem,
  toJS: unmarshalItem,
  unmarshalItem,
  unmarshalJson
};

export default marshaler;

dynamoDb-marshaler
===

Translates sane javascript objects (and JSON) into DynamoDb format and vice versa.

**Caveat** Does not yet work with Binary types (B and BS). I have personally never come across
a case where I'm using binary types in json. If you need binary support, please let me know how it might be done, or contribute.

## Install

```
npm install dynamodb-marshaler
```

## Basic Marshaling

```javascript
var AWS = require('aws-sdk'),
    marshalItem = require('dynamodb-marshaler').marshalItem;
    
AWS.config.region = 'us-west-2';

var dynamoDb = new AWS.DynamoDB();

dynamoDb.putItem({
    TableName: 'users',
    Item: marshalItem({username: 'nackjicholson'})  // {username: {S: 'nackjicholson'}}
});
```

## Basic Unmarshaling

```javascript
var AWS = require('aws-sdk'),
    unmarshalItem = require('dynamodb-marshaler').unmarshalItem;
    
AWS.config.region = 'us-west-2';

var dynamoDb = new AWS.DynamoDB();

var data = dynamoDb.scan({
    TableName: 'users'
}, function(err, data) {
    var items = data.Items; // {username: {S: 'nackjicholson'}
    console.log(unmarshalItem(items); // {username: 'nackjicholson'}
});
```

## JSON

You can marshal directly from a JSON string. Or unmarshal a DynamoDb api response into a JSON string. Use `marshalJson` and `unmarshalJson`.

## Examples

More extensive examples can be found in the [examples](https://github.com/CascadeEnergy/dynamoDb-marshaler/tree/master/examples) directory.

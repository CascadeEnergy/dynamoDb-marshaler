dynamoDb-marshaler
===

Translates sane javascript objects (and JSON) into DynamoDb format and vice versa.

**Caveat** Does not yet work with Binary types (B and BS). I have personally never come across
a case where I'm using binary types in json. If you need binary support, please let me know how it might be done, or contribute.

## Basic Usage

```javascript
var AWS = require('aws-sdk'),
    marshalItem = require('dynamoDb-marshaler').marshalItem;
    
AWS.config.region = 'us-west-2';

var dynamoDb = new AWS.DynamoDB();

dynamoDb.putItem({
    TableName: 'users',
    Item: marshalItem({username: 'nackjicholson'})  // {username: {S: 'nackjicholson'}}
});
```

dynamoDb-marshaler
===

Translates sane javascript objects (and JSON) into DynamoDb format and vice versa.

## Basic Usage

```javascript
var AWS = require('aws-sdk'),
    marshalItem = require('dynamoDb-marshaler').marshalItem;
    
AWS.config.region = 'us-west-2';

var dynamoDb = new AWS.DynamoDB();

var user = {username: 'billmurray'}; // {username: {S: 'billmurray'}}
dynamoDb.putItem({
    TableName: 'my-table',
    Item: marshalItem(user)
});
```

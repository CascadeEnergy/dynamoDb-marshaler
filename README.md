dynamoDb-marshaler
===

Translates sane javascript objects into DynamoDb format and vice versa.

## Basic Usage

```javascript
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

var dynamoDb = new AWS.DynamoDB(),
    marshalItem = require('dynamoDb-marshaler').marshalItem;

var user = {username: 'billmurray'};
dynamoDb.putItem({
    TableName: 'my-table',
    Item: marshalItem(user)
});
```

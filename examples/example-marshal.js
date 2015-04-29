'use strict';

var marshalItem = require('../dynamodb-marshaler').marshalItem;

var item = {
  name: 'Will Vaughn',
  age: 30,
  employed: true,
  relationshipStatus: undefined,
  defaultReplies: ['No.', 42],
  appearance: {
    height: 183,
    weight: 79,
    eyeColor: 'brown',
    ethnicity: {
      whiteAmerican: true,
      nativeAmerican: false,
      asianAmerican: false,
      africanAmerican: false,
      nativeHawaiianOrPacificIslander: false,
      someOtherRace: false
    }
  },
  favoriteFoods: ['burritos', 'fried chicken', 'pad kee mao'],
  luckyNumbers: [42, 98, 777],
  empty: [],
  duplicateList: ['foo', 'bar', 'foo']
};

console.log(JSON.stringify(marshalItem(item), null, 2));

//{
//  "name": {
//    "S": "Will Vaughn"
//  },
//  "age": {
//    "N": "30"
//  },
//  "employed": {
//    "BOOL": true
//  },
//  "relationshipStatus": {
//    "NULL": true
//  },
//  "defaultReplies": {
//    "L": [
//      {
//        "S": "No."
//      },
//      {
//        "N": "42"
//      }
//    ]
//  },
//  "appearance": {
//    "M": {
//      "height": {
//        "N": "183"
//      },
//      "weight": {
//        "N": "79"
//      },
//      "eyeColor": {
//        "S": "brown"
//      },
//      "ethnicity": {
//        "M": {
//          "whiteAmerican": {
//            "BOOL": true
//          },
//          "nativeAmerican": {
//            "BOOL": false
//          },
//          "asianAmerican": {
//            "BOOL": false
//          },
//          "africanAmerican": {
//            "BOOL": false
//          },
//          "nativeHawaiianOrPacificIslander": {
//            "BOOL": false
//          },
//          "someOtherRace": {
//            "BOOL": false
//          }
//        }
//      }
//    }
//  },
//  "favoriteFoods": {
//    "SS": [
//      "burritos",
//      "fried chicken",
//      "pad kee mao"
//    ]
//  },
//  "luckyNumbers": {
//    "NS": [
//      "42",
//      "98",
//      "777"
//    ]
//  },
//  "empty": {
//    "L": []
//  },
//  "duplicateList": {
//    "L": [
//      {
//        "S": "foo"
//      },
//      {
//        "S": "bar"
//      },
//      {
//        "S": "foo"
//      }
//    ]
//  }
//}

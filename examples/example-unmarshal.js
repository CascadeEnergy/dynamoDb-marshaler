'use strict';

var unmarshalJson = require('../index').unmarshalJson;

var item = {
    name: {S: 'Will Vaughn'},
    age: {N: '30'},
    employed: {BOOL: true},
    relationshipStatus: {NULL: true},
    defaultAnswers: {
        L: [
            {S: "No."},
            {N: '42'}
        ]
    },
    appearance: {
        M: {
            height: {N: '183'},
            weight: {N: '79'},
            eyeColor: {S: "brown"},
            ethnicity: {
                M: {
                    whiteAmerican: {BOOL: true},
                    nativeAmerican: {BOOL: false},
                    asianAmerican: {BOOL: false},
                    africanAmerican: {BOOL: false},
                    nativeHawaiianOrPacificIslander: {BOOL: false},
                    someOtherRace: {BOOL: false}
                }
            }
        }
    },
    favoriteFoods: {
        SS: [
            'burritos',
            'fried chicken',
            'pad kee mao'
        ]
    },
    luckyNumbers: {
        NS: ['42', '98', '777']
    }
};

// unmarshalJson() uses unmarshalItem() to do the work, but just stringifies the item to JSON for you.
console.log(unmarshalJson(item));

//{
//    "name": "Will Vaughn",
//    "age": 30,
//    "employed": true,
//    "relationshipStatus": null,
//    "defaultAnswers": [
//        "No.",
//        42
//    ],
//    "appearance": {
//        "height": 183,
//        "weight": 79,
//        "eyeColor": "brown",
//        "ethnicity": {
//            "whiteAmerican": true,
//            "nativeAmerican": false,
//            "asianAmerican": false,
//            "africanAmerican": false,
//            "nativeHawaiianOrPacificIslander": false,
//            "someOtherRace": false
//        }
//    },
//    "favoriteFoods": [
//        "burritos",
//        "fried chicken",
//        "pad kee mao"
//    ],
//    "luckyNumbers": [
//        42,
//        98,
//        777
//    ]
//}

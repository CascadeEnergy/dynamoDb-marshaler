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

var json = unmarshalJson(item);

console.log(json);

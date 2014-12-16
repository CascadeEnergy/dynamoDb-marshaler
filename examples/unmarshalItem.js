'use strict';

var unmarshalItem = require('../index').unmarshalItem;

var item = {
    username: {S: 'nackjicholson'},
    favoriteFoods: {SS: ['burritos', 'fried chicken', 'pad kee mao']}
};

var obj = unmarshalItem(item);

console.log(JSON.stringify(obj));

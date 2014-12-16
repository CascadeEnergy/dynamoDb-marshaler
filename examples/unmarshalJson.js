'use strict';

var unmarshalJson = require('../index').unmarshalJson;

var item = {
    username: {S: 'nackjicholson'},
    favoriteFoods: {SS: ['burritos', 'fried chicken', 'pad kee mao']}
};

var json = unmarshalJson(item);

console.log(json);

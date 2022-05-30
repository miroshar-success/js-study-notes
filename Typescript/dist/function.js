"use strict";
const greeter = (message) => {
    console.log(message);
};
greeter('hello');
const description = (message) => {
    return message;
};
description.description = '你好';
console.log(description('Hello') + '-' + description.description);
function firstElement(array) {
    return array[0];
}
console.log(firstElement(['hello', 'world']));
console.log(firstElement([1, 2, 3]));
console.log(firstElement([false, true]));
function map(array, func) {
    return array.map(func);
}
map(['1', '2', '3'], (n) => Number.parseInt(n, 10));
function longest(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    else {
        return b;
    }
}
console.log(longest([1, 2], [3, 4, 5, 6, 7]));
console.log(longest([1, 2, 3, 4, 5], [1, 2]));
function minimumLength(obj, minimum) {
    if (obj.length >= minimum) {
        return obj;
    }
    else {
        return Object.assign(Object.assign({}, obj), { length: minimum });
    }
}
function combine(arr1, arr2) {
    return [...arr1, ...arr2];
}
function filter(array, func) {
    return array.filter(func);
}
console.log(filter([1, 2, 3, 4, 5], (n) => n > 5));
function calc(x) {
    console.log(x);
}
calc(1);
calc(undefined);
calc();
function foreach(array, callback) {
    for (let i = 0, length = array.length; i < length; i++) {
        callback(array[i], i);
    }
}
foreach([1, 2, 3, 4, 5], (item) => {
    console.log(item);
});
foreach(['kyrie', 'wade', 'lebron', 'durant'], player => {
    console.log(player);
});
function date(timestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(timestamp, d, y);
    }
    return new Date(timestamp);
}
console.log(date(2022, 5, 17));
console.log(date(1652791785619));
function get_length(s) {
    return s.length;
}
console.log(get_length([1, 2, 3, 4, 5]));
console.log(get_length('hello world'));
const messages = [
    {
        id: 1,
        title: 'Vue.js',
        type: 'text'
    },
    {
        id: 2,
        title: 'React',
        type: 'image'
    },
    {
        id: 3,
        title: 'Redux',
        type: 'audio'
    },
    {
        id: 4,
        title: 'Vuex',
        type: 'text'
    },
    {
        id: 5,
        title: 'React-Redux',
        type: 'image'
    }
];
function get_message_list(type) {
    if (typeof type === 'number') {
        const find = messages.find(m => m.id === type);
        if (find)
            return [find];
        return [];
    }
    else {
        return messages.filter(m => m.type === type);
    }
}
console.log(get_message_list(4));
console.log(get_message_list('image'));
const user = {
    age: 30,
    firstName: 'kyrie',
    lastName: 'irving',
    fullName() {
        return this.firstName + this.fullName;
    }
};
function multiply(n, ...m) {
    return m.map(x => x * n);
}
console.log(multiply(2, 2, 3, 4, 5, 6, 7, 8));
const args = [8, 5];
console.log(Math.atan2(...args));
function increment({ a, b, c }) {
    return a + b + c;
}
increment({ a: 10, b: 20, c: 30 });
const hello1 = () => 123;
const hello2 = () => true;
const hello3 = () => false;
const hello4 = () => '123';
console.log(hello1(), hello2(), hello3(), hello4());
const source = [1, 2, 3, 4, 5];
const dest = [0];
source.forEach(el => dest.push(el));
console.log(dest);

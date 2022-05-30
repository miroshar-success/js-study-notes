"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message = 'hello world';
const height = 30;
const pi = 3.14;
const flag = true;
const ages = [10, 20, 30];
const players = ['kyrie', 'lebron', 'durant'];
const object = { firstName: 'kyrie', lastName: 'irving' };
console.log(object.firstName);
console.log(object.age);
object.say();
function greet(message) {
    return `Hello, ${message}`;
}
greet('World');
function plus(a, b) {
    return a + b;
}
plus(1, 2);
const names = ['Alice', 'Bob', 'Eve'];
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
function print(point) {
    console.log(point.x, point.y);
}
print({ x: 1, y: 2 });
function fullName(player) {
    var _a;
    console.log((_a = player.age) === null || _a === void 0 ? void 0 : _a.toString());
    if (player.age !== undefined) {
        player.age.toString();
    }
    return `${player.firstName} - ${player.lastName}`;
}
fullName({
    firstName: 'kyrie',
    lastName: 'irving'
});
function printId(id) {
    console.log(id.toString());
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    }
    else {
        console.log(id);
    }
}
printId(123);
printId('123');
function welcomePeople(peoples) {
    if (Array.isArray(peoples)) {
        console.log(`Hello, ${peoples.join(' and ')}`);
    }
    else {
        console.log(`Hello, ${peoples}`);
    }
}
function say(x) {
    return x.slice(0, 3);
}
function getFullName(p) {
    console.log(p.firstName + '-' + p.lastName);
}
function introduce(p) {
    console.log(`My name is ${p.name}, and I am ${p.age} years old`);
}
introduce({
    name: 'wade',
    age: 39,
    sex: 'male'
});
const canvas = document.getElementById('canvas');
const input = document.getElementById('input');
let secret = 'hello';
secret = 'hello';
function compare(a, b) {
    return a == b ? 0 : a > b ? 1 : -1;
}
function fetch(data) {
}
const requestObject = {
    url: 'https://www.baidu.com/api/',
    method: 'GET'
};
fetch({
    url: requestObject.method,
    method: requestObject.method
});
function m1(book) {
    console.log(book === null || book === void 0 ? void 0 : book.toString());
    console.log(book.toString());
}
const symbol = Symbol.for('hello');
const s2 = Symbol('world');
const max_number = BigInt(1000000);
const person = {
    firstName: 'kyrie',
    lastName: 'irving',
    age: 30
};
const union_person = {
    age: 32
};

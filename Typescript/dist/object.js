"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greet(person) {
    return 'Hello' + person.name;
}
function say(person) {
    return 'Hello' + person.name;
}
function hi(person) {
    return 'Hello' + person.name;
}
function paint(opts) {
    if (opts.x && opts.y)
        return opts.x * opts.y;
}
console.log(paint({ shape: 'square', x: 10, y: 10 }));
console.log(paint({ shape: 'square' }));
function paintShape({ shape, x = 0, y = 0 }) {
    return x * y;
}
console.log(paintShape({ shape: 'square', x: 10, y: 10 }));
console.log(paintShape({ shape: 'square' }));
function getStaff(s) {
    return s.age;
}
function increment(s) {
    s.count.value += 1;
}
const increment_object = {
    count: { value: 1 }
};
increment(increment_object);
increment(increment_object);
console.log(increment_object);
const talker = {
    name: 'kyrie',
    age: 30
};
const readonlyTalker = talker;
talker.age += 1;
console.log(readonlyTalker);
const talkers = ['1', '2', '3', '4', '5'];
const box1 = {
    contents: '12345'
};
const box2 = {
    contents: 12345
};
const container1 = {
    goods: ['1', '2']
};
const container2 = {
    goods: [1, 2, 3]
};
const readonlyStringArray = ['1', '2', '3'];
const stringHash = [1, '1'];
const numbers = [1, 2, 3];
const optionalArray1 = [1, 2, '1'];
const optionalArray2 = [1, 2];
const stringNumberBooleanArray = ['1', 2, false, true, false];

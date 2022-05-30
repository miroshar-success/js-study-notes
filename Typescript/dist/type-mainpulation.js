"use strict";
function identity(arg) {
    return arg;
}
console.log(identity(123));
console.log(identity('123'));
console.log(identity(false));
console.log(identity(null));
const identify_number = (arg) => {
    return arg * 2;
};
const identify_string = arg => {
    return arg + '!';
};
console.log(identify_number(123));
console.log(identify_string('hello'));
class GenericPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        if (typeof this.x === 'number' && typeof this.y === 'number') {
            return this.x + this.y;
        }
        else {
            return this.x + '-' + this.y;
        }
    }
}
const point_number = new GenericPoint(1, 2);
const point_string = new GenericPoint('1', '2');
console.log(point_number.toString(), point_string.toString());
function loggingLength(arg) {
    return arg.length;
}
console.log(loggingLength([1, 2, 3, 4, 5, 6]));
console.log(loggingLength('hello world!'));
function getProperty(obj, key) {
    return obj[key];
}
const car = {
    price: 1000000,
    color: 'red'
};
console.log(getProperty(car, 'color'));
console.log(getProperty(car, 'price'));
const msg = 'Hello World!';
function m1() {
    return {
        x: 10,
        y: 3
    };
}
const Players = [
    { name: 'Alice', age: 15 },
    { name: 'Bob', age: 23 },
    { name: 'Eve', age: 38 }
];

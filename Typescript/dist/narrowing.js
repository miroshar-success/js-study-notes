"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function padLeft(padding, input) {
    if (typeof padding === 'number') {
        return ' '.repeat(padding) + input;
    }
    return padding + input;
}
console.log(padLeft(3, 'hello'));
console.log(padLeft('123', 'hello'));
function printAll(strings) {
    if (typeof strings === 'object' && strings) {
        for (const string of strings) {
            console.log(string);
        }
    }
    else if (typeof strings === 'string') {
        console.log(strings);
    }
}
printAll('1234');
printAll(['1', '2', '3', '4']);
function multiplyApp(values, factor) {
    if (!values)
        return values;
    return values.map(x => x * factor);
}
console.log(multiplyApp([1, 2, 3, 4], 2));
console.log(multiplyApp([2, 3, 4], 1));
console.log(multiplyApp(undefined, 2));
function example(x, y) {
    if (x === y) {
        x.toUpperCase();
        y.toUpperCase();
    }
    else {
        console.log(x, y);
    }
}
function getContainerInfo(container) {
    if (container.value == null)
        return null;
    return container.value;
}
console.log(getContainerInfo({ value: 123 }));
console.log(getContainerInfo({ value: undefined }));
console.log(getContainerInfo({ value: null }));
function move(animal) {
    if ('skill' in animal) {
        return animal.skill();
    }
    return animal.swim();
}
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toLocaleDateString());
    }
    else {
        console.log(new Date(x));
    }
}
logValue(new Date());
logValue('2022-05-19');
function getArea(shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
    return shape.sideLength ** 2;
}
function getShapeArea(shape) {
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
    return shape.sideLength ** 2;
}
const player = {
    name: 'k y   r i e',
    skill() {
        console.log('crossover');
    },
    age: 30,
    allowInput: true
};
function check_object(obj) {
    if ('allowInput' in player) {
        Object.keys(obj).forEach(k => {
            if (typeof obj[k] === 'string') {
                console.log(obj[k].replace(/\s+/g, ''));
            }
            else if (typeof obj[k] === 'function') {
                obj[k]();
            }
            else {
                console.log('key', k, 'value', obj[k]);
            }
        });
    }
}
check_object(player);
class ClassA {
    getLength() {
        return 123;
    }
}
class ClassB {
    getLength() {
        return 456;
    }
    getName() {
        console.log('classB');
        return 'classB';
    }
}
function get_length(instance) {
    if (instance instanceof ClassB) {
        instance.getName();
    }
    return instance.getLength();
}
console.log('class-b:', get_length(new ClassB()));
class People {
    eat() {
        console.log('people eat');
    }
}
class Student extends People {
    study() {
        console.log('study');
    }
    eat() {
        console.log('student eat');
    }
}
class Stuff extends People {
    work() {
        console.log('work');
    }
    eat() {
        console.log('stuff work');
    }
}
function console_eat(p) {
    p.eat();
    if (p instanceof Stuff) {
        p.work();
    }
    else if (p instanceof Student) {
        p.study();
    }
}
console_eat(new Student());
console_eat(new Stuff());
function is_string(str) {
    return typeof str === 'string';
}
function is_function(fn) {
    return typeof fn === 'function';
}
const singer = {
    firstName: 'jay',
    lastName: 'chou',
    age: 30
};
Object.keys(singer).forEach((key) => {
    const value = singer[key];
    if (is_string(value)) {
    }
    else if (is_function(value)) {
        value();
    }
    else {
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class People {
    constructor(name, age) {
        this.age = age;
        this.name = name;
    }
    say() {
        console.log('hello');
    }
}
class Student extends People {
    constructor(name, age) {
        super(name, age);
    }
    study() {
        console.log('study');
    }
}
const people = new People('kyrie', 32);
const study = people;
const student = new Student('lebron', 37);
const result = student;
class ClassA {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    fullName() {
        return this.firstName + this.lastName;
    }
}
class ClassB {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
const classA = new ClassA('kyrie', 'irving', 30);
const classB = new ClassB('lebron', 'james');
const transformA = classA;
console.log(transformA.firstName, transformA.lastName);
const transformB = classB;
console.log(transformB.firstName, transformB.lastName, transformB.fullName(), transformB.age);
class Person {
    constructor(name, age, sex = 0) {
        this.name = name;
        this.age = age;
        this.sex = 1;
    }
}
const person1 = {
    name: 'hello',
    age: 20,
};
console.log(person1.age, person1.name);
const person2 = new Person('hello', 20);
console.log(person2.age, person2.name);
function get_length(a) {
    return a.length;
}

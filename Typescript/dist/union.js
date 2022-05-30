"use strict";
function sum(a, b) {
    if ('count' in a && 'count' in b) {
        return a.count + b.count;
    }
}
function trainAnimal(animal) {
    if (animal.fly) {
        animal.sing();
    }
    else {
        animal.bark();
    }
    if ('sing' in animal) {
        animal.sing();
    }
    else {
        animal.bark();
    }
}

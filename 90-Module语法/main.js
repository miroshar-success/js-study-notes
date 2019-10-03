// import {firstName,lastName,year} from "./profile.js";
// foo(2,3);
// console.log(firstName,lastName,year);

// import foo from "./profile.js";
// foo(2,3);

import {foo} from "./profile.js";

console.log(foo);

import {lastName as surname} from "./profile.js";
console.log(surname);	// james

import {area,circumference} from "./profile.js";
let s1 = area(5);
console.log(s1);

let s2 = circumference(10);
console.log(s2);

import * as circle from "./profile.js";
let ss1 = circle.area(10);
let ss2 = circle.circumference(10);
console.log(ss1,ss2);

import customName from "./demo.js";
customName();

import {obj} from "./demo.js";
obj.prop = 123;
console.log(obj);

import {c} from "./demo.js";
c.add();
c.add();
c.show();
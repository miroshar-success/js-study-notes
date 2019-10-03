console.log("Hello World");

const fs = require("fs");

let str = "Hello World";
let buf1 = Buffer.from(str);
console.log(buf1);

let buf2 = Buffer.from("abcd");
console.log(buf2);
console.log(buf2.toString("hex"));
console.log(buf2.toString('base64'));

const b1 = Buffer.from("Kyrie");
const b2 = Buffer.alloc(10);
const b3 = Buffer.allocUnsafe(10);
console.log(b1,b2,b3);

const b4 = Buffer.from(['a','b','c']);
const b5 = Buffer.from([1,2,3,15]);
console.log(b4,b5);
console.log(b1.toString());

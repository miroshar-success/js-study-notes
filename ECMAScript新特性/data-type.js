// --------- 获取值的准确类型 --------
var s = '123';
var n = 123;
var b = true;
var f = function () { };
var r = /\d+/g;
var d = new Date();
var u = undefined;
var n1 = null;
var s1 = Symbol('foo');
var s2 = new Set();
var m = new Map();
var o = { a: 1 };
var a = [1, 2, 3];
var p = Promise.resolve();
var c = /** @class */ (function () {
    function Player() {
        this.name = name;
    }
    return Player;
}());
console.log(typeof s); // string
console.log(typeof n); // number
console.log(typeof b); // boolean
console.log(typeof f); // function
console.log(typeof r); // object
console.log(typeof d); // object
console.log(typeof u); // undefined
console.log(typeof n1); // object
console.log(typeof s1); // symbol
console.log(typeof o); // object
console.log(typeof a); // object
console.log(typeof s2); // object
console.log(typeof m); // object
console.log(typeof p);
console.log(typeof c);
// typeof 只能判断值类型， 其他就是 function / object
function getType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}
console.log(getType(s)); // string
console.log(getType(n)); // number
console.log(getType(b)); // boolean
console.log(getType(f)); // function
console.log(getType(r)); // regexp
console.log(getType(d)); // date
console.log(getType(u)); // undefined
console.log(getType(n1)); // null
console.log(getType(s1)); // symbol
console.log(getType(o)); // object
console.log(getType(a)); // array
console.log(getType(s2)); // set
console.log(getType(m)); // map
console.log(getType(p)); // map
console.log(getType(c)); // map
// --------- 某个值 是不是指定的类型 ---------
function isType(type) {
    return function (object) {
        return Object.prototype.toString.call(object) === "[object ".concat(type, "]");
    };
}
var isString = isType('String');
console.log(isString('123')); // true
console.log(isString(123)); // false

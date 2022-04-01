// 程序执行需要的计算量和内存空间
// 复杂度是数量级, 不是具体的数字
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function m3(obj) {
    if (obj === void 0) { obj = {}; }
    return obj.a; // 计算量是一定的
}
// O(n) 和传输的数据量一致
function m4(array) {
    if (array === void 0) { array = []; }
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]); // 计算量和数组长度一致
    }
}
// O(n^2)  数据量的平方
function m5(array) {
    if (array === void 0) { array = []; }
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            console.log(array[j]);
        }
    }
}
// O(n*logn)
function fn(array) {
    if (array === void 0) { array = []; }
    for (var i = 0; i < array.length; i++) {
        // 二分
    }
}
// 空间复杂度: 执行代码所需要的空间
// O(1)
function m1(array) {
    if (array === void 0) { array = []; }
    var a = array[0];
    var b = array[1];
}
// O(n)
function m2(array) {
    if (array === void 0) { array = []; }
    var temp = [];
    for (var i = 0; i < array.length; i++) {
        temp[i] = array[i];
    }
    return temp;
}
// ---------------- 将一个数组旋转k步 -------------
function rotate_1(array, k) {
    if (array === void 0) { array = []; }
    if (k === void 0) { k = 1; }
    if (!array.length)
        return [];
    if (k < 0) {
        k = Math.abs(k);
    }
    if (k > array.length) {
        k = k % array.length;
    }
    var arr1 = array.slice(array.length - k);
    var arr2 = array.slice(0, array.length - k);
    return __spreadArray(__spreadArray([], arr1, true), arr2, true);
}
var array = [1, 2, 3, 4, 5, 6, 7];
console.log(rotate_1(array, 3)); // 5,6,7,1,2,3,4
console.log(rotate_1(array, 8)); // 7 1 2 3 4 5 6
// pop()
function rotate_2(array, k) {
    if (array === void 0) { array = []; }
    if (k === void 0) { k = 1; }
    if (!array.length)
        return [];
    if (k < 0) {
        k = Math.abs(k);
    }
    if (k > array.length) {
        k = k % array.length;
    }
    for (var i = 0; i < k; i++) {
        array.unshift(array.pop());
    }
    return array;
}
// console.log(rotate_2([1,2,3,4,5,6,7], 3))  // 5,6,7,1,2,3,4
// console.log(rotate_2([1,2,3,4,5,6,7], 8))  // 7,1,2,3,4,5,6
// ---- 测试 -----
var big_array = [];
for (var i = 0; i < 10 * 10000; i++) {
    big_array.push(i);
}
console.time('rotate1');
// console.log(rotate_1(big_array, 5* 10000))
console.log(rotate_2(big_array, 5 * 10000));
console.timeEnd('rotate1'); // 7 - 10 ms 之间
// ------------------- 字符串括号匹配 -----------------
// [a{b(c)}] 利用 进栈和出栈 判断
var string1 = '(a{b[c]})', string2 = '{a[b(c])}', string3 = '[a{b(]c)}]';
function is_equal(s1, s2) {
    return (s1 === '{' && s2 === '}') || (s1 === '(' && s2 === ')') || (s1 === '[' && s2 === ']');
}
var leftSymbols = ['[', '{', '('];
var rightSymbols = [']', '}', ')'];
function foo(str) {
    var array = [];
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var item = str_1[_i];
        if (!rightSymbols.includes(item) && !leftSymbols.includes(item))
            continue;
        if (leftSymbols.includes(item)) {
            array.push(item);
        }
        else {
            var lastStr = array[array.length - 1];
            if (is_equal(lastStr, item)) {
                array.pop();
            }
            else {
                return false;
            }
        }
    }
    return array.length === 0;
}
console.log('f1', foo(string1)); // true
console.log('f2', foo(string2)); // false
console.log('f3', foo(string3)); // false
// ------- 两个栈实现一个队列 -------
var Queue = /** @class */ (function () {
    function Queue() {
        this.stack1 = [];
        this.stack2 = [];
    }
    Queue.prototype.add = function (n) {
        this.stack1.push(n);
    };
    Queue.prototype["delete"] = function () {
        var res;
        while (this.stack1.length) {
            this.stack2.push(this.stack1.pop());
        }
        res = this.stack2.pop();
        while (this.stack2.length) {
            this.stack1.push(this.stack2.pop());
        }
        return res;
    };
    Object.defineProperty(Queue.prototype, "length", {
        get: function () {
            return this.stack1.length;
        },
        enumerable: false,
        configurable: true
    });
    return Queue;
}());
var q = new Queue();
q.add(10);
q.add(20);
q.add(30);
q.add(40);
console.log(q.length); // 4
console.log(q["delete"]()); // 10
console.log(q["delete"]()); // 20
console.log(q["delete"]()); // 30
console.log(q["delete"]()); // 40
console.log(q["delete"]()); // undefined
function createArrayUsePush(length) {
    var array = [];
    for (var i = 0; i < length; i++) {
        array.push(i);
    }
    return array;
}
function createArrayUseUnshift(length) {
    var array = [];
    for (var i = 0; i < length; i++) {
        array.unshift(i);
    }
    return array;
}
console.time('unshift');
createArrayUseUnshift(1000);
console.timeEnd('unshift');
console.time('push');
createArrayUsePush(1000);
console.timeEnd('push');
var array1 = createArrayUseUnshift(1000);
console.time('shift');
array1.shift();
console.timeEnd('shift');
console.time('pop');
array1.pop();
console.timeEnd('pop');
function createList(array) {
    if (array.length === 0)
        throw Error('something went wrong');
    var curObj = {
        value: array[array.length - 1]
    };
    if (array.length === 1)
        return curObj;
    for (var i = array.length - 2; i >= 0; i--) {
        // curObj.next = curObj
        // curObj.value = array[i]
        curObj = {
            value: array[i],
            next: curObj
        };
    }
    return curObj;
}
console.log('单向链表:', createList([10, 20, 30, 40, 50]));



const b_array = []
for(let i = 0; i < 1000000; i++){
  b_array.push(i)
}

console.time('push')
b_array.push(1)
console.timeEnd('push')

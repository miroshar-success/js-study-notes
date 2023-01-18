var sum_function = function (x, y) { return x + y; };
function multiple_function(x, y) {
    return x * y;
}
// -------------- 可选参数 -------------
function optional_argument_function(x, y) {
    if (typeof y === 'undefined')
        return x.toString();
    return x + y;
}
console.log(multiple_function(3, 4));
console.log(optional_argument_function(12, 3));
console.log(optional_argument_function(3));
// ------- 可选参数必须位于函数列表末尾位置 ---------------
function many_optional_argument_function(x, y, z) {
    return x + (y !== null && y !== void 0 ? y : 0) + (z !== null && z !== void 0 ? z : 0);
}
console.log(many_optional_argument_function(1)); // 1
console.log(many_optional_argument_function(3, 5)); // 8
console.log(many_optional_argument_function(1, 2, 5)); // 8
console.log(undefined !== null && undefined !== void 0 ? undefined : 1); // 1
console.log(null !== null && null !== void 0 ? null : 10); // 10
console.log(123 !== null && 123 !== void 0 ? 123 : 345); // 123
// ------------------- 默认参数 -------------------
var default_argument_function = function (x, y) {
    if (y === void 0) { y = 123; }
    return x + y;
};
console.log(default_argument_function(2, 3)); // 5
console.log(default_argument_function(2)); // 125
console.log(default_argument_function(2, undefined)); // 125
var default_arguments_function = function (x, y) {
    if (x === void 0) { x = 1; }
    if (y === void 0) { y = 2; }
    return x + y;
};
console.log(default_arguments_function(3, 5)); // 8
console.log(default_arguments_function(10)); // 12
// ---------------- 剩余参数 -------------
var rest_arguments_function = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    return x.reduce(function (p, n) { return p + n; }, 0);
};
console.log(rest_arguments_function(3, 4, 5, 6)); // 18
var arguments_sum_function = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var sum = 0;
    for (var i = 0, length_1 = args.length; i < length_1; i++) {
        sum += args[i];
    }
    return sum;
};
console.log(arguments_sum_function(1, 2, 3, 4, 5)); // 15
// ---------------- 元祖类型剩余参数 -------------
var rest_tuple_arguments = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var x = args[0], y = args[1];
    return x + Number(y);
};
console.log(rest_tuple_arguments(2, true)); // 3
console.log(rest_tuple_arguments(2, false)); // 2
//------- 可选参数 元祖 -------
var option_rest_tuple_arguments = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var x = args[0], y = args[1];
    if (typeof y === undefined)
        return x;
    return x + Number(y);
};
var hello_world = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var x = args[0], y = args[1];
    return Number(x) + y.reduce(function (p, n) { return p + n; }, 0);
};
console.log(hello_world(true, [2, 3, 4, 5])); // 15
console.log(hello_world(false, [2, 3, 4, 5])); // 14
// ------------- 解构参数类型 -----------
var f0 = function (_a) {
    var x = _a[0], y = _a[1];
    return x + y;
};
console.log(f0([3, 5])); // 8
var f1 = function (_a) {
    var x = _a.x, y = _a.y;
    return x + y;
};
console.log(f1({ x: 123, y: 456 })); // 579
// ---------- 函数类型字面量 -----------
var add;
add = function (x, y) {
    return x + y;
};
var sum_function_1 = function (x, y) { return x + y; };
console.log(sum_function_1(3, 5));
console.log(sum_function_1(4, 9));
var invoke_function;
invoke_function = function (x, y) { return x + Number(y); };
console.log(invoke_function(3, '5')); // 8
var abs0 = Math.abs;
var abs1 = Math.abs;
console.log(abs0(123), abs0(-123), abs1(123), abs1(-123)); // 123  123  123  123
// 函数添加一个属性
console.log(abs0.name, abs1.name); // abs  abs
var version_function = function (x) {
    console.log(x);
};
version_function.version = '123';
// ------------- 构造函数 --------------
var Dog;
Dog = /** @class */ (function () {
    function class_1(name) {
        this.name = name;
    }
    return class_1;
}());
var dog = new Dog('kyrie');
// ------------------ 调用签名与构造签名 -------------------
var number_a = Number(1);
var number_b = new Number(2);
console.log(number_a, number_b);
function heavy_load_function(x, y) {
    if (typeof x === 'number' && typeof y === 'number')
        return x + y;
    if (Array.isArray(x) && Array.isArray(y)) {
        return x.reduce(function (p, n) { return p + n; }, 0) + y.reduce(function (p, n) { return p + n; }, 0);
    }
    return 0;
}
console.log(heavy_load_function(3, 5)); // 8
console.log(heavy_load_function([1, 2, 3], [3, 4, 5])); // 18
function translate_number(number) {
    if (typeof number === 'string')
        return Number(number);
    return number;
}
console.log(translate_number(123)); // 123
console.log(translate_number('234')); // 234
function foo_union(x) {
    return Number(x);
}
console.log(foo_union('123'));
console.log(foo_union(345));

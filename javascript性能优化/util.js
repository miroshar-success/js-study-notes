//  千分位转化数字 (只考虑正整数)
function format1(money) {
    if (money >= 0 && money <= 999)
        return money;
    var array = money.toString().split('').reverse();
    // [7,6,5,4,3,2,1]
    return array.reduce(function (prev, next, i) {
        if (i % 3 === 0 && i !== 0) {
            return next + ',' + prev;
        }
        else {
            return next + prev;
        }
    }, '');
}
var number1 = 1234567;
console.log(format1(number1));
// ----- 字符串方法 ------
function format2(money) {
    if (money >= 0 && money <= 999)
        return money;
    var string = money.toString();
    var length = string.length;
    // 1234567
    var str = '';
    //i 6 / j 1
    for (var i = length - 1; i >= 0; i--) {
        var j = length - i - 1;
        if (j % 3 === 0 && j !== 0) {
            str = string[i] + ',' + str;
        }
        else {
            str = string[i] + str;
        }
    }
    return str;
}
var number2 = 1234567678;
console.log(format2(number2));
// --------- 字符串大小写转换 ----------
function letterSwitch(str) {
    var length = str.length;
    if (length === 0)
        return '';
    var result = '';
    var reg1 = /[a-z]/, reg2 = /[A-Z]/;
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var item = str_1[_i];
        if (reg1.test(item)) {
            result += item.toUpperCase();
        }
        else if (reg2.test(item)) {
            result += item.toLowerCase();
        }
        else {
            result += item;
        }
    }
    return result;
}
var string = 'AccxD2@xYz';
console.log(letterSwitch(string)); // aCCXd2@XyZ
// ------ 利用ASCII 编码 -----
function letterSwitch2(str) {
    var length = str.length;
    if (length === 0)
        return '';
    var result = '';
    for (var _i = 0, str_2 = str; _i < str_2.length; _i++) {
        var item = str_2[_i];
        var code = item.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            result += item.toLowerCase();
        }
        else if (code >= 97 && code <= 122) {
            result += item.toUpperCase();
        }
        else {
            result += item;
        }
    }
    return result;
}
console.log(letterSwitch2(string)); // aCCXd2@XyZ

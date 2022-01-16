//  ------------ 为函数定义类型 --------
function add(x, y) {
    return x + y;
}
var getSum = function (x, y) { return x + y; };
// --------- 函数类型包含两部分, 参数类型和返回值类型 -----
/*
可选参数和默认参数
*/
function fullName(firstName, lastName) {
    return firstName + '' + lastName;
}
function f1(firstName, lastName) {
    if (lastName) {
        return firstName + '' + lastName;
    }
    else {
        return firstName;
    }
}
function f2(firstName, lastName) {
    if (lastName === void 0) { lastName = 'Smith'; }
    return firstName + lastName;
}
console.log(f1('kyrie'));
console.log(f2('lebron'));
// -------- 剩余参数 --------
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + ' ' + restOfName.join(' ');
}
var employeeName = buildName('Joseph', 's1', 's2', 's3');
console.log(employeeName);
// --------- this指向 --------
var deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        // 箭头函数能够保证this为创建时的值,而不是调用时的值。
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return {
                suit: _this.suits[pickedSuit],
                card: pickedCard % 13
            };
        };
    }
};
var cardPicker = deck.createCardPicker();
console.log(cardPicker());
// ----------- this参数------------
var player = {
    firstName: 'kyrie',
    lastName: 'irving',
    getFullName: function () {
        var _this = this;
        return function () {
            return "".concat(_this.firstName, " - ").concat(_this.lastName);
        };
    }
};
var getFullName = player.getFullName();
console.log('getFullName:', getFullName());

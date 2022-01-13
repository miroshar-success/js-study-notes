// -------------------------- 原始类型 --------------------
// 布尔值
var isDone = false;
// 数字
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
// 字符串
var player = 'bob';
console.log(player); // bob
// --- 模版字符串 ----
var singer = "".concat(player);
var age = 37;
var sentence = "".concat(player, " is ").concat(age, " years old");
// ---- 数组 -----
var player_list = ['kyrie', 'lebron'];
player_list.push('wade');
console.log(player_list.length);
var numberArray = [1, 2, 3];
// --- 元祖 ----
var stringArray = [1, '1'];
console.log(stringArray[0], stringArray[1]); // 1 '1'
// -------- 枚举 -------
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var red = Color.Red;
var green = Color.Green;
var blue = Color.Blue;
console.log(red, green, blue); // 0 1 2
var Direction;
(function (Direction) {
    Direction["Left"] = "left";
    Direction["Right"] = "right";
    Direction["Top"] = "top";
    Direction["Down"] = "down";
})(Direction || (Direction = {}));
var left = Direction.Left;
console.log(left); // left
// ------ any ------
var notSure = 4;
console.log(notSure.toFixed(2));
// ----- void ------
function greeting(name) {
    console.log("hello, ".concat(name));
}

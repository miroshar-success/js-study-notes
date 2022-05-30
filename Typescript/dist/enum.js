"use strict";
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction || (Direction = {}));
function respond(recipinet, message) {
    console.log(recipinet, message);
}
respond('hello', Direction.DOWN);
var Color;
(function (Color) {
    Color["RED"] = "red";
    Color["BLUE"] = "blue";
    Color["YELLOW"] = "yellow";
})(Color || (Color = {}));
function getColor(message) {
    console.log(Color, message);
}
getColor(Color.BLUE);
getColor(Color.RED);
getColor(Color.RED);
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 4] = "Read";
    FileAccess[FileAccess["Write"] = 2] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    FileAccess[FileAccess["G"] = '123'.length] = "G";
})(FileAccess || (FileAccess = {}));
console.log(FileAccess.None, FileAccess.Read, FileAccess.Write, FileAccess.ReadWrite, FileAccess.G);
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
const circle = {
    kind: ShapeKind.Circle,
    radius: 100
};
const square = {
    kind: ShapeKind.Square,
    sideLength: 200
};
var E;
(function (E) {
    E[E["X"] = 0] = "X";
    E[E["Y"] = 1] = "Y";
    E[E["Z"] = 2] = "Z";
})(E || (E = {}));
function f1(obj) {
    console.log(obj.X);
    console.log(obj.Y);
}
f1(E);
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
console.log(typeof LogLevel);
function printImportant(key, message) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log("Log level key is:", key);
        console.log("Log level value is:", num);
        console.log("Log level message is:", message);
    }
}
printImportant('ERROR', 'This is a message');
let directions = [1, 2, 3, 0];
console.log(directions);
const codes = [200, 0, 0];
console.log(codes);
const back_codes = ["error", "success", "warning"];
console.log(back_codes);
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
};
function walk(dir) {
    console.log(dir);
}
walk(1);
walk(2);

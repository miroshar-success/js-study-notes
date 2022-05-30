"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isDone = false;
const decLiteral = 6;
const hexLiteral = 0xf00d;
const binaryLiteral = 0b1010;
const octalLiteral = 0o744;
const player = 'bob';
console.log(player);
const singer = `${player}`;
const age = 37;
const sentence = `${player} is ${age} years old`;
const player_list = ['kyrie', 'lebron'];
player_list.push('wade');
console.log(player_list.length);
const numberArray = [1, 2, 3];
const stringArray = [1, '1'];
console.log(stringArray[0], stringArray[1]);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
const red = Color.Red;
const green = Color.Green;
const blue = Color.Blue;
console.log(red, green, blue);
var Direction;
(function (Direction) {
    Direction["Left"] = "left";
    Direction["Right"] = "right";
    Direction["Top"] = "top";
    Direction["Down"] = "down";
})(Direction || (Direction = {}));
const left = Direction.Left;
console.log(left);
const notSure = 4;
console.log(notSure.toFixed(2));
function greeting(name) {
    console.log(`hello, ${name}`);
}
const not_sure_1 = null;
const not_sure_2 = undefined;
function getResult() {
    throw new Error('error');
}
const stringValue = 'This is a string';
const stringLength = stringValue.length;
const stringLength_1 = stringValue.length;
const players = ['kyrie', 'lebron'];
players[0] = 'irving';
const readonly_players = ['kyrie', 'lebron'];
const readonly_singers = ['jay', 'mayday'];

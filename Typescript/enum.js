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

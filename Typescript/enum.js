var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
var up = Direction.Up;
var down = Direction.Down;
console.log(up, down); // 1 2
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Green"] = "green";
    Color["Blue"] = "blue";
})(Color || (Color = {}));
var red = Color.Red;
var green = Color.Green;
var blue = Color.Blue;
console.log(red, green, blue); // red  green   blue
var a = 1 /* A */;
var b = 2 /* B */;
console.log(a, b);
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
console.log('directions', directions);

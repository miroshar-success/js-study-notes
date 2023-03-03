var utils;
(function (utils) {
    function isString(value) {
        return typeof value === 'string';
    }
})(utils || (utils = {}));
var System;
(function (System) {
    var Utils;
    (function (Utils) {
        function isString(value) {
            return typeof value === 'string';
        }
    })(Utils = System.Utils || (System.Utils = {}));
})(System || (System = {}));
(function (System) {
    var Utils;
    (function (Utils) {
        function isString(value) {
            return typeof value === 'string';
        }
    })(Utils = System.Utils || (System.Utils = {}));
})(System || (System = {}));
var Outer;
(function (Outer) {
    var a = 0;
    var Cat = /** @class */ (function () {
        function Cat(name) {
            this.name = name;
        }
        return Cat;
    }());
    function print(p) {
        console.log(p);
    }
})(Outer || (Outer = {}));
// Outer.print({ x: 1, y: 2 })
var Player;
(function (Player) {
    function print(p) {
        console.log(p);
    }
    Player.print = print;
})(Player || (Player = {}));
Player.print({ firstName: 'kyrie', lastName: 'irving', age: 31 });

// --------------- 命名空间 ------------
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
// ----------- 别名导入 ------------------
var Plugins;
(function (Plugins) {
    function isString(value) {
        return typeof value === 'string';
    }
    Plugins.isString = isString;
})(Plugins || (Plugins = {}));
var App;
(function (App) {
    var isString = Plugins.isString;
    console.log(isString('hello'));
    console.log(isString(123));
    console.log(isString(undefined));
    var p = { x: 1, y: 2 };
    console.log(p);
})(App || (App = {}));

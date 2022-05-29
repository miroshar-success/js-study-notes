"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Animal = /** @class */ (function () {
    function Animal(x, y) {
        this.x = x;
        this.y = y;
    }
    return Animal;
}());
var animal = new Animal(1, 3);
console.log(animal.x, animal.y); // 1 3
// ----------- strictPropertyInitialization ---------
// ----- readonly -----
var Greeter = /** @class */ (function () {
    function Greeter(otherName) {
        this.name = 'world';
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
    return Greeter;
}());
var g1 = new Greeter('hello'); // hello
var g2 = new Greeter(); // world
console.log(g1.name, g2.name);
// g.name = '123'  // error
// ---------- constructors -----------
var ColorPoint = /** @class */ (function () {
    function ColorPoint(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return ColorPoint;
}());
var c1 = new ColorPoint(1, 3);
var c2 = new ColorPoint(1, 4);
console.log(c1.x, c1.y, c2.x, c2.y);
// --------------- methods -----------------
var Scaler = /** @class */ (function () {
    function Scaler(x, y) {
        this.x = 10;
        this.y = 10;
        this.x = x;
        this.y = y;
    }
    Scaler.prototype.scale = function (s) {
        this.x *= s;
        this.y *= s;
    };
    return Scaler;
}());
var scaler = new Scaler(1, 3);
scaler.scale(3);
console.log(scaler); // { x: 3, y: 9 }
// ---------- getters/ setters ----------
var GetLength = /** @class */ (function () {
    function GetLength() {
        this._length = 0;
    }
    Object.defineProperty(GetLength.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
        },
        enumerable: false,
        configurable: true
    });
    return GetLength;
}());
var l = new GetLength();
console.log(l.length); // 0
l.length = 10;
console.log(l.length); // 10
var Singer = /** @class */ (function () {
    function Singer() {
    }
    Singer.prototype.say = function () {
        console.log('lala');
    };
    return Singer;
}());
var People = /** @class */ (function () {
    function People() {
    }
    People.prototype.run = function () {
        console.log('run');
    };
    People.prototype.walk = function () {
        console.log('walk');
    };
    return People;
}());
// ----------------- extends -----------------
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.move = function () {
        console.log('move...');
    };
    return Dog;
}());
var Lee = /** @class */ (function (_super) {
    __extends(Lee, _super);
    function Lee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lee.prototype.woof = function (times) {
        for (var i = 0; i < times; i++) {
            console.log('woof!');
        }
    };
    return Lee;
}(Dog));
var lee = new Lee();
lee.move(); // move...
lee.woof(2); // woof! woof!
// ----------------- overriding methods ------------------
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.greet = function () {
        console.log('Hello, world!');
    };
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.greet = function (name) {
        if (name === undefined) {
            _super.prototype.greet.call(this);
        }
        else {
            console.log("Hello, ".concat(name.toUpperCase()));
        }
    };
    return Derived;
}(Base));
var derived = new Derived();
derived.greet('jack'); // Hello, JACK
derived.greet(); // Hello, world!
// ----------- Initialization Order -------
var BaseClass = /** @class */ (function () {
    function BaseClass() {
        this.name = 'base';
        console.log(this.name);
    }
    return BaseClass;
}());
var BaseDerived = /** @class */ (function (_super) {
    __extends(BaseDerived, _super);
    function BaseDerived() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'derived';
        return _this;
    }
    return BaseDerived;
}(BaseClass));
var base_derived = new BaseDerived(); // base
// ------------ member visibility ----------
/*
You can use TypeScript to control whether certain methods or properties are visible to code
outside the class.
*/
var GreeterClass = /** @class */ (function () {
    function GreeterClass(name) {
        this.name = name;
    }
    GreeterClass.prototype.greet = function () {
        console.log("Hello, ".concat(this.name));
    };
    return GreeterClass;
}());
var greeter1 = new GreeterClass('kyrie');
greeter1.greet(); // hello, kyrie
/*
Because public is already the default visibility modifier, you do not ever need to write it on
a class member, but might choose to do so for style/readability reasons.
*/
// protected
/*
protected members are only visible to subclassed of the class they're declared in.
*/
var Reader = /** @class */ (function () {
    function Reader() {
    }
    Reader.prototype.greet = function () {
        console.log("Hello, ".concat(this.getName()));
    };
    Reader.prototype.getName = function () {
        return 'Irving';
    };
    return Reader;
}());
var SubReader = /** @class */ (function (_super) {
    __extends(SubReader, _super);
    function SubReader(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    SubReader.prototype.hello = function () {
        console.log("Hello, ".concat(this.getName()));
        console.log("Hello, ".concat(_super.prototype.getName.call(this)));
        console.log(this.name); // james
    };
    return SubReader;
}(Reader));
var reader = new SubReader('james');
reader.greet(); // Hello, Irving
reader.hello(); // Hello, Irving
console.log(reader['name']); // james
// reader.getName() 只能在类 或者 子类内部访问
// console.log(reader.name)  // 报错
// privated
/*
private is like protected, but doesn't allow access to the member even from subclassed.
*/
var Phone = /** @class */ (function () {
    function Phone(price) {
        this.price = price;
    }
    Phone.prototype.getPrice = function () {
        return this.price;
    };
    return Phone;
}());
var phone = new Phone(5999);
// console.log(phone.price)    报错
console.log(phone.getPrice()); // 5999
/*
Like other aspects of TypeScript's type system, private and protected are only enforced during
type checking.

This means that JavaScript runtime constructs like in or simple property lookup can still access
a private or protected member.
*/
// ------- static members --------
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.print = function () {
        console.log(MyClass.x);
    };
    MyClass.x = 0;
    return MyClass;
}());
var SubClass = /** @class */ (function (_super) {
    __extends(SubClass, _super);
    function SubClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SubClass;
}(MyClass));
console.log(MyClass.x); // 0
MyClass.print(); // 0
console.log(SubClass.x); // 0
SubClass.print(); // 0
var MouseEvent = /** @class */ (function () {
    function MouseEvent() {
    }
    MouseEvent.prototype.mouseover = function () { };
    MouseEvent.prototype.mouseout = function () { };
    return MouseEvent;
}());
var MouseEventAdapter = /** @class */ (function (_super) {
    __extends(MouseEventAdapter, _super);
    function MouseEventAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseEventAdapter.prototype.click = function () {
    };
    MouseEventAdapter.prototype.dblclick = function () {
    };
    return MouseEventAdapter;
}(MouseEvent));
var Player = /** @class */ (function () {
    function Player() {
        this.firstName = '';
        this.lastName = '';
    }
    return Player;
}());
new Player();

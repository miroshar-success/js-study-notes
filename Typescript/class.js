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
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, ".concat(this.greeting);
    };
    return Greeter;
}());
// ---------- 类继承 ---------
/* class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}`)
  }
}
class Dog extends Animal {
  bark() {
    console.log('Woof, Woof!')
  }
}
const dog = new Dog()
dog.bark() */
// ------------------------ 继承 --------------------------
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("".concat(this.name, " moved ").concat(distanceInMeters, "m"));
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake('Sammy the Python');
var tom = new Horse('Tommy the Palomino');
sam.move();
tom.move(34);
// -------------- 公共,私有与受保护的修饰符 ------------
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.age = 30;
        this.team = 'Nets';
    }
    Player.prototype.skill = function (s) {
        console.log("".concat(this.name, "\u2018s skill is ").concat(s));
    };
    return Player;
}());
var kyrie = new Player('kyrie');
kyrie.skill('crossover');
// --------------------- 比较private和protected ---------------
// protected 在派生类中仍然可以访问
var Person = /** @class */ (function () {
    function Person(name, age) {
        if (age === void 0) { age = 40; }
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name, 40) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        console.log(this.age);
        return "Hello, my name is ".concat(this.name, " and I work in ").concat(this.department);
    };
    return Employee;
}(Person));
var howard = new Employee('howard', 'sale');
var person = new Person('kyrie', 20);
// --------------- readonly修饰符 -----------------
var Octopus = /** @class */ (function () {
    function Octopus(name) {
        this.numberOfLengths = 0;
        this.name = name;
    }
    return Octopus;
}());
var dad = new Octopus('Man with the 8 strong legs');
// --------------------- 存取器 --------------------
var Singer = /** @class */ (function () {
    function Singer() {
    }
    return Singer;
}());
var singer = new Singer();
singer.fullName = 'jay chou';
if (singer.fullName) {
    console.log(singer.fullName);
}
// -------- 验证密码是否正确 ---------
/* const password = 'secret keyword';
class Game {
  private _fullName:string
  get fullName():string{
    return this._fullName
  }
  set fullName(value:string) {
    if(password && password === 'secret keyword'){
      this._fullName = value;
    }else{
      console.log('Error: Unauthorized update of Game!')
    }
  }
}
const game = new Game()
game.fullName = 'Bob Smith'; */
// ------------------- 静态属性 ------------------
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = point.x - Grid.origin.x;
        var yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0);
var grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({ x: 2, y: 3 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 3, y: 4 }));


# 1. Class类

    由于类的方法都定义在prototype对象上面,所以类的新方法可以添加在prototype对象上面.
    Object.assign方法可以很方便地一次向类添加多个方法

```js
class Point{
    constructor(){}
    toString(){}
    toValue(){}
}

// 使用Object.assign 方法
Object.assign(Point.prototype,{
    toString(){},
    toValue(){}
});

Point.prototype.constructor === Point;
```

    tips:
    1. 类内部定义的方法，都是不可枚举的
    2. ES5构造函数定义的方法是可以枚举的
    3. 类调用必须要用new调用,构造函数不用new也可以执行
    
## 1.1. constructor方法

    一个类必须有constructor方法,如果没有显式定义,一个空的constructor方法会被默认添加.
```js
class Point{

}

//等同于
class Point{
    constructor(){}
}
```

    实例的属性除非显式定义在其本身,否则都是定义在原型上。

    可以通过实例的 __proto__ 属性为 '类' 添加方法
    下面实例在p1的原型上添加了一个printName方法,p1的原型就是p2的原型,p2也可以调用这个方法。
    而且,此后新建的实例p3也可以调用这个方法。
```js
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        console.log(this.x + this.y);
    }
}

let p1 = new Point(2,3);
let p2 = new Point(3,2);

p1.__proto__.printName = function(){
    console.log('abc');
}
p1.printName();     // abc
p2.printName();     // abc
p3.printName();     // abc
```

## 1.2. getter和setter

```js
class myClass{
    constructor() {}
    get prop(){
        return 'getter'
    }
    set prop(value){
        console.log('setter:' + value);
    }
}
```
    存值函数与取值函数是设置在属性的Descriptor对象上的.

## 1.3. Class表达式

```js
const myClass = class Me{
    getClassName() {
        console.log(Me.name);
    }
}
let int = new myClass();
int.getClassName(); // Me

// tips: 1. 类的名字是myClass 而不是Me,Me只在Class的内部代码可用,指代当前类
```
    1. 类和模块的内部,默认就是严格模式
    2. 不存在提升
    3. name属性 name属性总是返回紧跟在class关键字后面的类名。

## 1.4. 静态方法

    static

    tips:
    1. 如果在一个方法前,加上static关键字,就表示该方法不会被实例继承,而是直接通过类来调用。
    2. 如果静态方法包含this关键字,这个this指的是类,而不是实例。
    3. 父类的静态方法,可以被子类继承

## 1.5. extends 关键字继承

    ES5的继承,先创造子类的实例对象this,然后再将父类的方法添加到this上
    ( Parent.apply(this) )。

    ES6 是先将父类实例对象的属性和方法，加到this上，然后再用子类的构造函数修改this。

    tips: 在子类的构造函数中,只有调用super之后，才可以使用this关键字,否则会报错。


**Object.getPrototypeOf()**

    Object.getPrototypeOf() 可以用来从子类上获取父类

## 1.6. super关键字

    super既可以当函数使用,也可以当作对象使用。

    1. 作为函数调用时,子类的构造函数必须执行一次super函数。代表调用父类的构造函数
    super虽然代表了父类A的构造函数,但是返回的是子类B的实例,即super内部的this指的是B

```js
class A{
    constructor(){
        console.log(new.target.name);
    }
}
class B extends A{
    constructor(){
        super();
    }
}
new A();    // A
new B();    // B

// tips 1. 作为函数只能用在子类的构造函数中,其他地方会报错
```

    2. 作为对象时,在普通方法中,指向父类的原型对象;在静态方法中,指向父类。
```js
class Foo{
    say(){
        console.log('Hello World');
    }
}

class Bar extends Foo{
    constructor(
        super();
        // super指向 Foo.prototype ,super.say相当于 Foo.prototype.say
        super.say();
    )
}
let bar = new Bar();    // Hello World!
```
    3. 定义在父类实例上的方法或属性，是无法通过super调用的
```js
class A{
    constructor(){
        this.p = 2;
    }
}
class B extends A{
    constructor(){
        super();
        console.log(super.p);   
    }
}
let b = new B();        // undefined


// 定义在原型上就可以获取
class A {}
A.prototype.x = 2;

class B extends A{
    constructor(){
        super();
        console.log(super.x);
    }
}
```

    4. ES6规定，在子类普通方法中通过super调用父类方法时,方法内部的this指向当前的子类实例
```js
class A{
    constructor(){
        this.x = 1;
    }
    print(){
        console.log(this.x);
    }
}

class B extends A{
    constructor(){
        super();
        this.x = 2;
    }
    m(){
        super.print();
    }
}
let b = new B();
b.m();      // 2
```

    5. 通过super对某个属性赋值时,赋值的属性会变成子类实例的属性
```js
class A{
    constructor(){
        this.x = 1;
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x);
        console.log(this.x);
    }
}
let b = new B();
```
    6. 如果super作为对象,用在静态方法中,这时super将指向父类,而不是父类的原型对象。
    在静态方法中指向父类,在普通方法之中指向父类的原型对象。
```js
class Parent{
    static myMethod(msg){
        console.log('static',msg);
    }
    myMethod(msg){
        console.log('instance',msg);
    }
}

class Child extends Parent{
    static myMethod(msg){
        super.myMethod(msg);
    }
    myMethod(msg){
        super.myMethod(msg);
    }
}
Child.myMethod(1);  // static 1
let child = new Child();
child.myMethod(2);  // instance 2
```

## 1.7. 类的prototype属性和__proto__属性

    1. 子类的__proto__属性，表示构造函数的继承,总是指向父类
    2. 子类的prototype属性的__proto__属性,表示方法的继承,总是指向父类的prototype属性。

```js
class A{};
class B extends A{}

B.__proto__ == A; // true
B.prototype.__proto__ == A.prototype;   // true
```
    子类的原型对象(prototype属性)是父类的原型对象(prototype属性)的实例。

    B.prototype.__proto__ == A.prototype;


    原生的构造函数:
    Boolean()
    Number()
    Function()
    String()
    Date()
    Object()
    Array()
    Regexp()

    原生构造函数是无法继承的
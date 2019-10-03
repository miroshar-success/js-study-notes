# Generator

	Generator函数是ES6提供的一种异步编程解决方案，封装了多个内部状态。执行Generator函数会返回一个
	遍历器对象，可以依次遍历Generator函数内部的每一个状态。
```js
function* HelloWorldGenerator(){
	yield 'hello';
	yield 'world';
	return 'ending';
}
const hw = HelloWorldGenerator();	// 调用Generator函数的时候并不会立即执行。

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```
	tips: Generator函数返回的是一个遍历器对象,代表Generator函数的内部指针。以后每次调用遍历器对象的next方法，
	就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值,是yield表达式后面那个表达式的
	值,done属性是一个布尔值,表示是否遍历结束。
	
# yield与return区别

	1. yield只能在Generator函数里使用
	2. generator函数内部可以有多个yield,只能执行一次return语句,但可以执行多个yield表达式。

	相同之处: 都能返回紧跟在表达式后面的值。
	
	tips:
	1. 如果将一个yield放在表达式之中,必须放在圆括号里面.

# 与Iterator接口的关系

	任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数,调用该函数会返回该对象的一个遍历器对象。
```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

# next方法
	
	yield表达式本身没有返回值,或者说总是返回undefined。next方法可以带一个参数,该参数就会被当作上一个yield
	表达式的返回值。
```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

# for...of循环
	
	for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法
```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```
	tips: 一旦next方法返回的对象done属性为true,for...of循环就会中止,且不包含该返回对象。
	除了for...of 循环, Array.from 解构赋值，扩展运算符 和 Array.from 方法内部调用的都是遍历器接口。
	
	
# Generator.prototype.return()

	可以返回给定的值,并且终结遍历Generator函数。
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```
	return方法调用时,不提供参数,则返回值的value属性为undefined.
	
# yield* 表达式

	如果在generator函数内部,调用另一个generator函数,需要在前者的函数内部,手动完成遍历。
	ES6 提供了 yield* 表达式,用来在一个Generator函数里面 执行另一个Generator函数。
// ------------- 实现一个new -----------------
const createObject = (...args) => {
  const [fn, ...arguments] = args; // 提取构造函数 和 传递的参数
  // 箭头函数无法作为构造函数
  if (!fn.prototype) {
    throw new Error(`${fn.name} is not a constructor`)
  }
  const object = Object.create(fn.prototype)
  const result = fn.call(object, ...arguments)
  // 如果构造函数return一个对象 则返回函数执行的结果, 否则返回一个指向构造函数原型的对象 
  return typeof result === 'object' ? result : object
}

// --------- 测试 -----------
function Player(name, age) {
  this.name = name
  this.age = age
}
Player.prototype.say = function() {
  console.log(`Hello, my name is ${this.name}`)
}
const player = createObject(Player, 'kyrie', 32)
console.log(player, player.__proto__ === Player.prototype, Player.prototype.constructor)
// Player { name: 'kyrie', age: 32 }  true
player.say()        // Hello, my name is kyrie

// --------- 测试构造函数有返回值 --------
// 1. 返回值为简单数据类型
function Person(name, age) {
  this.name = name
  this.age = age
  return name
}
const person = createObject(Person, '张三', 10)
console.log(person) // Person { name: '张三', age: 10 }

// 2. 返回值为一个对象
function Car(color) {
  this.color = color
  return { message: 'hello world' }
}
const car = createObject(Car, 'red')
console.log(car)  // { message: 'hello world' }

// ---------- 测试箭头函数 作为参数 -----------
const Phone = (color, price) => {
  this.color = color
  this.price = price
}
const phone = createObject(Phone, 'white', 5999) // Error: Phone is not a constructor


// ---------- 使用new 执行构造函数的结果对比 ------------
const new_player = new Player('wade', 42)
console.log(new_player, new_player.__proto__ === Player.prototype)
// Player { name: 'wade', age: 42 } true
new_player.say()  // Hello, my name is wade


const new_person = new Person('李四', 20)
console.log(new_person) // Person { name: '??', age: 20 }


const new_car = new Car('blue')
console.log(new_car)  // { message: 'hello world' }


const new_phone = new Phone('pink', 6799) // TypeError: Phone is not a constructor

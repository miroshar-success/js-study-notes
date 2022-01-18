// ---------- 继承 (原型链继承) ------------
function Parent(name){
  this.name = name;
  this.colors = ['red','blue','green']
}
Parent.prototype.say = function(){
  console.log(`I am ${this.name}`)
}

/* const parent = new Parent('parent')
console.log(parent) // {name:'parent'}
parent.say()  // I am parent
 */

function Child(){
}

Child.prototype = new Parent('child')
Child.prototype.constructor = Child;
const child = new Child()
console.log('child', child, child.__proto__.name) // {}  child
child.say() // I am child

// ---------------- 缺点 ---------------
/*
1. 如果有属性是引用类型,如果其中一个属性改变了,所有属性都会被修改
2. Child无法传递参数
*/
const p1 = new Parent('p1')
const p2 = new Parent('p2')
console.log(p1, p2)
/*
{ name: 'p1', colors: [ 'red', 'blue', 'green' ] }
{ name: 'p2', colors: [ 'red', 'blue', 'green' ] }
*/
// p1.colors.push('white')


const c1 = new Child()
const c2 = new Child()
console.log(c1.colors, c2.colors) // [ 'red', 'blue', 'green' ] [ 'red', 'blue', 'green' ]
c1.colors.pop()
console.log(c1.colors, c2.colors) // [ 'red', 'blue' ] [ 'red', 'blue' ]
c1.colors.push('white')
console.log(c1.colors, c2.colors) // [ 'red', 'blue', 'white' ] [ 'red', 'blue', 'white' ]



p1.colors.unshift('black')
console.log(p1.colors, p2.colors, c1.colors, c2.colors)
// p1.colors和p2.colors是独立的
// [ 'black', 'red', 'blue', 'green' ] [ 'red', 'blue', 'green' ] [ 'red', 'blue', 'white' ] [ 'red', 'blue', 'white' ]

console.log(Child.prototype.__proto__ === Parent.prototype) // true


// ---------- 把构造函数上的属性/方法 赋值到child上 --------------
function Animal(name){
  this.name = name;
  this.eat = function(){
    console.log(this.name + '-' + 'eat')
  }
}
Animal.prototype.run = function(){
  console.log(this.name + '-' + 'run')
}

function LandAnimals(name, id){
  // 属性或者方法 只能继承 构造函数里定义的,在原型上定义的方法 无法继承
  Animal.call(this, name)
  this.id = id;
  this.foods = ['vegetables', 'fruit', 'feed']
}

const animal = new Animal('animal')
const monkey = new LandAnimals('monkey', 123)
const pig = new LandAnimals('pig',456)

console.log('pig', pig)
console.log('monkey', monkey)
pig.foods.pop()
console.log(pig.foods, monkey.foods)  // [ 'vegetables', 'fruit' ] [ 'vegetables', 'fruit', 'feed' ]

pig.eat()
monkey.eat()
// pig.run()    pig.run is not a function


// ----------------- 组合继承 -------------------
/*
通过call方法继承父类构造函数属性和方法, 修改子类原型对象, 继承父类原型上的对象。
问题: 调用了两次Parent方法
*/
function Father(name, age){
  this.name = name;
  this.age = age;
  this.colors = ['blue', 'green', 'red']
}
Father.prototype.say = function(){
  console.log('I am ' + this.name);
}
function Son(name, age){
  Father.apply(this, Array.from(arguments));
  this.skill = ['hello', 'world']
}
Son.prototype = new Father()
Son.prototype.constructor = Son;
const son1 = new Son('kyrie', 30);
const son2 = new Son('lebron', 37);

son1.skill.pop();
console.log(son1, son2)
/* Son { name: 'kyrie', age: 30, skill: [ 'hello' ] }
Son { name: 'lebron', age: 37, skill: [ 'hello', 'world' ] }
*/
son1.say()  // I am kyrie
son2.say()  // I am lebron
console.log(son1.colors)  // [ 'blue', 'green', 'red' ]
son1.colors.pop()
console.log(son1.colors)  // [ 'blue', 'green' ]
console.log(son2.colors)  // [ 'blue', 'green', 'red' ]


// ----------------------- 寄生式继承 -------------------------

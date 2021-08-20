const keyA = {a: 1}
const keyB = {a: 2}

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
}
console.log(myObject) // {[object Object]: 'valueB'}

// ---------------- 属性名是变量
let lastWord = 'last word';
const a = {
  'first word': 'hello',
  [lastWord]: 'world'
}
console.log('a:', a);


// ------------------- 方法的name属性
const person = {
  sayName() {
    console.log('hello')
  }
}
console.log('name:', person.sayName.name) // sayName

const key1 = Symbol('description')
const key2 = Symbol()

let object = {
  [key1](){},
  [key2](){}
}
console.log(object[key1].name, object[key2].name);

for(let key in person){
  console.log('key:',key)
}


// ---------------- 属性的可枚举和遍历
// Object.getOwnPropertyDescriptor(obj,'foo')

const o = {foo:123}
console.log(Object.getOwnPropertyDescriptor(o,'foo'))
// { value: 123, writable: true, enumerable: true, configurable: true }


function Player(firstName,lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
Player.prototype.skill = function() {
  console.log('crossover')
}

let player = new Player('kyrie','irving')

for(let key in player) {
  console.log('for-in-key:', key) // firstName lastName skill
}
console.log(Object.keys(player)); // ['firstName','lastName']

let clone_player = Object.assign({},player)
console.log(clone_player) // {'firstName':'kyrie','lastName':'irving'}


//   Class 类, 原型上的属性是不可枚举的
class Singer {
  constructor(firstName,lastName){
    this.firstName = firstName;
    this.lastName = lastName
  }
  say() {
    console.log('haha')
  }
}
const singer = new Singer('jay','chou')

for(let key in singer){
  console.log('for-in-key:', key) // firstName lastName
}

for(let key of Object.keys(singer)){
  console.log('for-of-key:',key)  // firstName lastName
}
for(let v of Object.values(singer)){
  console.log(v)
}

let singerSymbol = Symbol('singer')
singer[singerSymbol] = 'hello';

console.log(Object.getOwnPropertyDescriptor(Object.prototype,'toString'));

console.log(Object.getOwnPropertyNames(singer))
console.log(Object.getOwnPropertySymbols(singer));


// ------------ super关键字
const _proto_ = {
  foo:'hello'
}
let obj1 = Object.create(_proto_)

console.log('obj1:', obj1, obj1.__proto__)


// ---------- 扩展运算符
let obj = {a:{b:1}}
let {...x} = obj;
console.log('x:',x)
x.a.b = 2;
console.log('obj:', obj)  // {a:{b:2}}

const o1 = Object.create({m:1,n:2})
o1.z = 3;

let {m,...newObj} = o1;
console.log(m,newObj);  // 1  {z:3}

const o2 = Object.create({p:1})
o2.q = 2;
let {p,q} = o2;
console.log(p,q)  // 1 2


const x1 = false, x2 = '123'
console.log(x1 || x2) // 123

const y1 = '123', y2 = false;
console.log(y1 || y2) // 123xs


const m1 = false , m2 = '123'
console.log(m1 && m2) // false

const n1 = '123', n2 = false;
console.log(n1 && n2) // false
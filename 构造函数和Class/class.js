// Class
class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return this.x + this.y
  }
  toValue () {
    return this.x + this.y
  }
}

const p = new Point(2,3)
p.toString()
console.log(typeof Point, Point === Point.prototype.constructor);

console.log('Point-prototype:',Object.keys(Point.prototype))  // []

function Foo (x,y) {
  this.x = x;
  this.y = y
}
Foo.prototype.toString = function() {
  return this.x + this.x
}
console.log('Foo-prototype:', Object.keys(Foo.prototype)) // ['toString']


// constructor默认返回 this(实例对象)
class Baz {
  constructor(name) {
    this.name = name
  }
}
const baz = new Baz('kyrie')
console.log('baz:',baz,baz.name)


function Player(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
Player.prototype.skill = function(){
  console.log('crossover')
}

class P {
  constructor(firstName) {
    return new Player(firstName)
  }
}
const kyrie = new P('kyrie')
console.log('firstName:', kyrie.firstName, 'lastName:', kyrie.lastName)
kyrie.skill()
console.log('P-prototype', Object.keys(P.prototype))
console.log(Object.getOwnPropertyNames(P.prototype))

class ChangePrototype {
  constructor() {
    return this
    // return Object.create(null)
  }
}
console.log(new ChangePrototype());



// 属性在的位置
class Singer {
  constructor(name) {
    this.name = name
  }
  skill () {
    console.log('rapper')
  }
}
const singer = new Singer('jay')
console.log(singer.hasOwnProperty('name'))  // true
console.log(singer.hasOwnProperty('skill')) // false
// ------- 实现一个new -----------
function createObject(fun: Function, ...args:any[]) {
  // 创建一个对象,
  // 对象的__proto__ 指向fun.prototype
  // 返回新创建的对象
  if(!fun.prototype) {
    throw new Error('arrow function can not be a constructor')
  }
  const object = Object.create({})
  object.__proto__ = fun.prototype
  const returnValue = fun.apply(object ,args)
  return returnValue === 'object' ? returnValue: object
}

function Player(name: string, age: number) {
  this.name = name
  this.age = age
}
Player.prototype.skill = function(){
  console.log('crossover')
}

const player = createObject(Player, 'kyrie', 30)
console.log(player.name, player.age)
console.log(typeof player.skill)
player.skill()

/* kyrie 30
function
crossover */


// ----------- 直接修改一个对象的__proto__ -----------
function Say(name: string) {
  this.name = name
}
Say.prototype.say = function() {
  console.log(this.name)
}
const say = new Say('kyrie')

const object = {
  __proto__: say
}
console.log(object.__proto__.name)  // kyrie
object.__proto__.say()  // kyrie
// @ts-ignore
console.log('kyrie',object.name)  // kyrie
// @ts-ignore
object.say()  // kyrie


const obj = Object.create(null)
obj.__proto__ = {
  name: 'hello'
}
console.log('hello:', obj.name) // undefined

const obj1 = Object.create({})
obj1.__proto__ = {
  name: 'hello'
}
console.log('hello:', obj1.name)  // hello

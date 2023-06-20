// ------------- 实现一个new -----------------
const createObject = (...args) => {
  const [fn, ...arguments] = args
  if (!fn.prototype) {
    throw new Error('fn can not called by new')
  }
  const object = Object.create(fn.prototype)
  const result = fn.call(object, ...arguments)
  return typeof result === 'object' ? result : object
}

const ArrayPlayer = (name, age) => {
  this.name = name
  this.age = age
}

/* const array_player = createObject(ArrayPlayer, 'kyrie', 32)
console.log(array_player) */
// 报错

function Player(name, age) {
  this.name = name
  this.age = age
}
Player.prototype.say = function() {
  console.log(`Hello, my name is ${this.name}`)
}
const player = createObject(Player, 'kyrie', 32)
console.log(player)
player.say()
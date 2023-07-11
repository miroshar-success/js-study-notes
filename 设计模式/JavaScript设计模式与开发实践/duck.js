// ------------------ 鸭子类型 ---------------------
//  多态
/**
 * 多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性。从而消除条件分支语句。
 * 做什么 和 谁去做  分离开来。
*/
const Duck = function() {}
Duck.prototype.sound = function() {
  console.log('嘎嘎嘎')
}

const Chicken = function() {}
Chicken.prototype.sound = function() {
  console.log('咯咯咯')
}

const makeSound = (animal) => {
  animal.sound()
}

makeSound(new Duck())
makeSound(new Chicken())


const makeAnimalSound = function(animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎')
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯')
  }
}
makeAnimalSound(new Duck())
makeAnimalSound(new Chicken())


// ---------------------- Movie ---------------------
// 演员
function Actor() {}
Actor.prototype.action = () => {
  console.log('开始演戏...')
}
// 灯光
function Lighter() {}
Lighter.prototype.action = function() {
  console.log('打灯光...')
}

function Cameraman() {}
Cameraman.prototype.action = function() {
  console.log('开始录影...')
}

function action(...roles) {
  roles.forEach(role => {
    role.action()
  })
}
const actor = new Actor()
const lighter = new Lighter()
const cameraman = new Cameraman()

action(actor, lighter, cameraman)
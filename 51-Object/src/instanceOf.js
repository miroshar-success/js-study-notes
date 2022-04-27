function Player(name) {
  this.name = name
}
const kyrie = new Player('kyrie')
console.log(kyrie)
console.log(kyrie instanceof Player)  // true
console.log(kyrie instanceof Object)  // true

/* Player.prototype = {
  skill() {
    console.log('crossover')
  }
} */
console.log(kyrie instanceof Player)  // false
console.log(kyrie instanceof Object)  // true

// --------- 封装一下 instanceof --------
function checkInstance(instance, constructor) {
  if(typeof instance == null) return false
  if(typeof instance !== 'object' && typeof instance !== 'function') return false
  let a = instance
  while(a){
    if(Object.getPrototypeOf(a) === constructor.prototype) {
      return true
    }else{
      a = Object.getPrototypeOf(a)
    }
  }
  return false
}

console.log(checkInstance(kyrie, Player)) // true
console.log(checkInstance(kyrie, Object)) // true

console.log('123' instanceof Object)  // false
console.log(new String(123) instanceof Object)  // true
console.log(123 instanceof Number)  // false
console.log(true instanceof Boolean)  // false

console.log(new Number(123) instanceof Number)  // true
console.log(new Boolean(false) instanceof Boolean)  // true

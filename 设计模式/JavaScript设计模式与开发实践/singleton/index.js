// ------------------- 单例模式 ---------------------
const Singleton = function(name) {
  this.name = name
}
Singleton.prototype.getName = function() {
  console.log(this.name)
}
Singleton.getInstance = (function() {
  let instance = null
  return function(name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()
const singleton_a = Singleton.getInstance('a')
const singleton_b = Singleton.getInstance('b')

console.log(singleton_a, singleton_b, singleton_a === singleton_b)

// ------------- 下一个例子 --------------------

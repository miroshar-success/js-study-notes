// ----------- 单例模式 -----------
class SingleObject {
  static getInstance = (() => {
    let instance = null
    return function() {
      if(!instance) {
        instance = new SingleObject()
      }
      return instance
    }
  })()
  login() {
    console.log('hello...')
  }
}

const instance_1 = SingleObject.getInstance()
const instance_2 = SingleObject.getInstance()
const instance_3 = SingleObject.getInstance()

console.log(instance_1 === instance_2)  // true
console.log(instance_2 === instance_3)  // true

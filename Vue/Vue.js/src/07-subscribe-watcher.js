// --------------------------------------------- 发布订阅模式-------------------------------------------
class EventInit {
  constructor() {
    this.props = {}; // 存储事件 {click:[fn1,fn2], change:[fn1]}
  }
  $on(eventName,fn) { // 监听事件
    this.props[eventName] = this.props[eventName] || []
    this.props[eventName].push(fn)
  }
  $emit(eventName) {
    if(this.props[eventName] && this.props[eventName].length) {
      this.props[eventName].forEach(fn => {
        fn()
      })
    }
  }
}

const init = new EventInit()

init.$on('click',function() {
  console.log('click-1')
})
init.$on('click',function() {
  console.log('click-2')
})
init.$on('change',function(){
  console.log('change-1')
})

init.$emit('click')
init.$emit('change')

// ------------------------------- 观察者模式 -------------------------------
class Dep { // 发布
  constructor() {
    this.subs = []
  }
  addSub(sub) { // 添加订阅者
    if(sub && sub.update){
      this.subs.push(sub)
    }
  }
  notify() {  // 发布
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}

class Watcher {
  update() {
    console.log('hello update')
  }
}

const dep = new Dep()
const watcher1 = new Watcher()
const watcher2 = new Watcher()

dep.addSub(watcher1)
dep.addSub(watcher2)
dep.notify()

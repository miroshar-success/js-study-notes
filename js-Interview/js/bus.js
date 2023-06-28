class Bus extends EventTarget {
  on(type, listener) {
    this.addEventListener(type, listener)
  }
  off(type, listener) {
    this.removeEventListener(type, listener)
  }
  emit(type, data) {
    this.dispatchEvent(new CustomEvent(type, {
      detail: data
    }))
  }
}

// const bus = new Bus()

// -------------- 自行实现 -------------
class EventBus {
  constructor() {
    this.events = {}
  }
  on(type, listener, once = false) {// 默认不止监听一次
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push({ listener, once })
  }
  once(type, listener) {
    this.on(type, listener, true) // 监听一次
  }
  emit(type, ...args) { // args  传递的参数
    if (!this.events[type]) return
    // 重新赋值, 过滤掉只执行一次的函数
    this.events[type] = this.events[type].filter(item => {
      (typeof item.listener === 'function') && (item.listener(...args))
      return !item.once
    })
  }
  off(type, listener) {
    if (!this.events[type]) return
    if (listener === undefined) { // 清除所有事件
      this.events[type] = []
    } else {
      // 清除指定的事件
      this.events[type] = this.events[type].filter(item => item.listener !== listener)
    }
  }
  clear(type) {
    if (type) {
      this.off(type)
    } else {
      this.events = {}
    }
  } 
}

// ----------------- 测试 -------------------
const bus = new EventBus()
bus.on('update', () => {
  console.log('我可以触发多次')
})
bus.once('update', () => {
  console.log('我只触发一次')
})
bus.emit('update')
bus.emit('update')
/* 我可以触发多次
我只触发一次
我可以触发多次 */

const listener = () => {
  console.log('hello')
}
bus.on('key', listener)
bus.emit('key') // 输出 hello
bus.off('key')  // 解绑
bus.emit('key') // 再次触发无输出

bus.clear()
bus.emit('update')
// 已经全部清除, 没有输出

// --------测试携带参数 -------
bus.on('bus', (...args) => {
  console.log(args) // [1, 2, 3]
})
bus.emit('bus', 1, 2, 3)

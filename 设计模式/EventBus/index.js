/*
存储 key : [fn]
*/
class EventBus {
  constructor() {
    this.tasks = {}
  }
  on(key, fn) {
    if(!this.tasks[key]) {
      this.tasks[key] = []
    }
    this.tasks[key].push(fn)
  }
  off(key, callback) {
    const fnTask = this.tasks[key]
    if(fnTask) {
      this.tasks[key] = []
    }
    callback()
  }
  emit(key, ...args) {
    const fnTask = this.tasks[key]
    if(fnTask && fnTask.length) {
      fnTask.forEach(fn => {
        fn(...args)
      })
    }
  }
}

const bus = new EventBus()
bus.on('update', function() {
  console.log('更新了', arguments)
})

bus.emit('update', 1,2,3)

bus.off('update', function(){
  console.log('解除绑定了')
})

bus.emit('update', 123)

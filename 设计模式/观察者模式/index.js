// -------------- 观察者模式 ------------
class Subject {
  constructor() {
    this.observers = []
  }
  add(observer) {
    this.observers.push(observer)
  }
  remove(observer) {
    this.observers = this.observers.filter(o => o !== observer)
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}


class Observer {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log(`${this.name} updated......`)
  }
}

const subject = new Subject()
const o1 = new Observer('observer1')
const o2 = new Observer('observer2')
const o3 = new Observer('observer3')
const observers = [o1, o2, o3]
observers.forEach(observer => {
  subject.add(observer)
})
// subject.add(o1)
// subject.add(o2)
// subject.add(o3)
subject.notify()




// ------------ node.js  event -------------
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()

emitter.on('update', (info) => {
  console.log('fn1', info)
})

emitter.on('update', (info) => {
  console.log('fn2', info)
})

emitter.emit('update', 'hello')

class Dog extends EventEmitter {
  constructor(name) {
    super()
    this.name = name
  }
  bark() {
    console.log(`${this.name} bark...`)
  }
}
const dog = new Dog('simon')

dog.on('bark', () => {
  dog.bark()
})
dog.emit('bark')

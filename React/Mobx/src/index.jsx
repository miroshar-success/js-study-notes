const { createRoot } = window.ReactDOM
const { makeObservable, observable, action, autorun } = window.mobx
const { observer } = window.mobxReactLite

class Counter {
  constructor() {
    this.value = 0
    makeObservable(this, {
      value: observable,
      increment: action,
      decrement: action,
      increment_by: action
    })
  }
  increment() {
    this.value += 1
  }
  decrement() {
    this.value -= 1
  }
  increment_by(payload) {
    this.value += payload
  }
  get double() {
    return this.value * 2
  }
}
const counter = new Counter()

autorun(() => {
  console.log('i am changed', counter.value)
})
/* setInterval(() => {
  counter.increment()
}, 1000) */


const CounterView = observer(({counter}) => (
  <div>
    <button onClick={() => counter.increment()}>+</button>
    {counter.value} --- {counter.double}
    <button onClick={() => counter.decrement()}>-</button>
    <button onClick={() => counter.increment_by(3)}>+3</button>
  </div>
))

const root = createRoot(document.querySelector('#mobx-app'))
root.render(
  <CounterView counter={counter}/>
)



class Animal {
  constructor(name, energyLevel) {
    this.name = name
    this.energyLevel = energyLevel || 100
    makeObservable(this, {
      reduceEnergy: action,
      name: observable,
      energyLevel: observable
    })
  }
  reduceEnergy() {
    this.energyLevel -= 10
  }
  get isHungry() {
    return this.energyLevel < 50
  }
}
const monkey = new Animal('monkey', 200)
autorun(() => {
  console.log('energy level', monkey.energyLevel)
})

autorun(() => {
  if(monkey.isHungry) {
    console.log('I am hungry')
  } else {
    console.log('I am not hungry')
  }
})

for(let i = 0; i < 10; i++) {
  monkey.reduceEnergy()
}

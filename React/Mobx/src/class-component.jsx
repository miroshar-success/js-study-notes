const { createRoot } = window.ReactDOM
const { observable, action, makeObservable, computed, runInAction } = window.mobx
const { observer, Observer } = window.mobxReact
const { Component } = window.React

class Counter {
  constructor() {
    this.value = 0
    makeObservable(this, {
      value: observable,
      increment: action,
      decrement: action,
      double: computed
    })
  }
  increment() {
    this.value += 1
  }
  decrement() {
    this.value -= 1
  }
  get double() {
    return this.value * 2
  }
}

/* class CounterComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { counter } = this.props
    return (
      <div>
        <button onClick={() => counter.decrement()}>decrement</button>
        {counter.value}
        <button onClick={() => counter.increment()}>increment</button>
      </div>
    )
  }
} */

/* const CounterFunctionComponent = observer(({counter}) => (
  <div>
    <button onClick={() => counter.decrement()}>decrement</button>
    {counter.value}
    <button onClick={() => counter.increment()}>increment</button>
    <button onClick={action(e => {
      console.log('hello', e)
      counter.value += 1
    })}>reset</button>
  </div>
)) */

const CounterComponent = ({counter}) => {
  console.log('hello')
  return (
    <Observer>{
      () => (
        <div>
          {counter.value}
          <button onClick={() => counter.decrement()}>decrement</button>
          <button onClick={() => counter.increment()}>increment</button>
          <button onClick={() => {
            setTimeout(() => {
              counter.increment()
            }, 1000)
          }}>increment async</button>
        </div>
      )
    }</Observer>
  )
}



const counter = new Counter()
// const ObservableCounterComponent = observer(CounterComponent)
const root = createRoot(document.querySelector('#class-component'))
root.render(
  <CounterComponent counter={counter}/>
)


class Doubler {
  constructor(value) {
    this.value = 0
  }
  increment() {
      this.value++
  }
  decrement = () => {
    this.value--
  }
}

const doubler = new Doubler()
console.log(doubler)
/*
{
  decrement: ƒ ()
  value: 0
  [Prototype]: {
    increment: f()
  }
}
*/

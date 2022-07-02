const { createContext, useContext } = window.React
const { createRoot } = window.ReactDOM
const { observer } = window.mobxReactLite
const { observable, action, makeObservable } = window.mobx

class Counter {
  constructor() {
    this.value = 1
    makeObservable(this, {
      value: observable,
      increment: action,
      decrement: action
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
const counter = new Counter()
const CounterContext = createContext()
const useCounter = () => {
  return useContext(CounterContext)
}

const CounterA = observer(() => {
  const c = useCounter()
  return (
    <div>
      counter a {c.value}
      <button onClick={() => c.increment()}>+</button>
    </div>
  )
})

const CounterB = observer(() => {
  const c = useCounter()
  return (
    <div>
      counter b {c.value}
      <button onClick={() => c.decrement()}>-</button>
    </div>
  )
})

const ProviderComponent = ({children}) => (<CounterContext.Provider value={counter}>{children}</CounterContext.Provider>)

const root = createRoot(document.querySelector('#root-state-app'))
root.render(
  <ProviderComponent>
    <CounterA/>
    <CounterB/>
  </ProviderComponent>
)

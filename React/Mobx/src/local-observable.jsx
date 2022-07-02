const { createRoot } = window.ReactDOM
const { makeObservable, observable, action } = window.mobx
const { useLocalObservable, Observer } = window.mobxReactLite
const { useState } = window.React

function App() {
  const todo = useLocalObservable(() => {
    console.log('render')
    return {
      title: 'Hello World',
      done: true,
      toggle() {
        this.done = !this.done
      }
    }
  })
  const [ count, setCount ] = useState(0)
  return (
    <Observer>
      {() => (<div>
        <button onClick={() => setCount(count+1)}>{count}</button>
        <button onClick={todo.toggle}>{todo.title} {todo.done ? 'done' : 'undo'}</button>
      </div>)}
    </Observer>
  )
}

const root = createRoot(document.querySelector('#local-observable-app'))
root.render(
  <App/>
)

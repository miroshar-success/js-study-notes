// redux性能优化 (查看每个reducer执行的时间)
const productList = [
  { id: 1, name: 'iPhone', price: 5999, quantity: 10 },
  { id: 2, name: 'Watch', price: 3199, quantity: 4 },
  { id: 3, name: 'Mac', price: 8999, quantity: 13 },
  { id: 4, name: 'iPods', price: 2999, quantity: 6 }
]

const shopCarReducer = (state = [], action) => {
  console.log('shop执行了吗')
  const { type, payload } = action
  switch (type) {
    case 'shoppingcar/increment': {
      // 方便计算一个reducer的时长
/*       for (let i = 0; i < 500000000; i++) {
      } */
      const idx = state.findIndex(product => product.id === payload.id)
      if (idx === -1) {
        return state.concat(Object.assign({}, payload, { count: 1 }))
      }
      return state.map((item, index) => {
        if (index === idx) {
          return {
            ...item,
            count: item.count + 1
          }
        }
        return item
      })
    }
    case 'shoppingcar/decrement': {
      const idx = state.findIndex(product => product.id === payload.id)
      if (idx === -1) {
        return state
      }
      if (state[idx].count === 1) return state
      return state.map((item, index) => {
        if (index === idx) {
          return {
            ...item,
            count: item.count - 1
          }
        }
        return item
      })
    }
    default:
      return state
  }
}
// counter
const counterReducer = (state = 0, action) => {
  console.log('counter执行了吗')
  const { type, payload } = action
  switch (type) {
    case 'counter/increment':
      return state + payload
    case 'counter/decrement':
      return state - payload
    default:
      return state
  }
}

const logShowReducers = (reducers) => {
  Object.keys(reducers).forEach(name => {
    const originalReducer = reducers[name]
    reducers[name] = (state, action) => {
      const start = Date.now()
      const result = originalReducer(state, action)
      console.log(`time-diff ${Date.now() - start}`)
      return result
    }
  })
  return combineReducers(reducers)
}

// 拦截reducer 判断当前reducer 能不能执行
const specialActions = (reducer, prefix, defaultState) => {
  return (state, action) => {
    console.log(prefix, action, state)
    if (action.type.match(prefix)) {
      return reducer(state, action)
    }
    // 需给一个默认值, 因为action不匹配 没有走到reducer里面, 没有获取到reducer里的默认值
    return defaultState
  }
}

const store = createStore(logShowReducers({
  car: specialActions(shopCarReducer, 'shoppingcar', []),
  counter: specialActions(counterReducer, 'counter', 0)
}))

const ProductList = () => {
  const [list, setList] = useState(productList)
  const dispatch = useDispatch()
  const handleAddCar = (product) => {
    const { quantity, ...props } = product
    if (quantity === 0) return
    dispatch({
      type: 'shoppingcar/increment',
      payload: props
    })
    setList(list.map(item => {
      if (item.id === product.id) return {...item, quantity: item.quantity - 1 }
      return item
    }))
  }
  return (
    <ol>
      { list.map(product => (<li key={product.id} style={{display: 'flex', padding: '5px 0' }}>
        <span style={{width: 70}}>{product.name}</span>
        <span style={{padding: '0 12px'}}>{product.price}</span>
        <span style={{padding: '0 12px', width: 120 }}>数量: {product.quantity}</span>
        {
          product.quantity > 0 ? (<button onClick={() => handleAddCar(product)}>加入购物车</button>) : <span style={{color: 'red'}}>售罄</span>
        }
      </li>))}
    </ol>
  )
}

const CarList = () => {
  const goodsList = useSelector(state => state.car)
  return (
    <ul>
      { goodsList.map(good => (
        <li key={good.id} style={{display: 'flex'}}>
          <span style={{width: 100 }}>{good.name}</span>
          <span>{good.count} * {good.price } = {good.count * good.price }</span>
        </li>
      ))}
    </ul>
  )
}

const ShoppingApp = () => {
  return (
    <>
      <ProductList/>
      <CarList/>
    </>
  )
}
//dispatch的时候 每个reducer都会执行判断action.type。
const CounterApp = () => {
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <>
      <button onClick={() => dispatch({type: 'counter/increment', payload: 2})}>increment 2</button>
      <button>{counter}</button>
      <button onClick={() => dispatch({type: 'counter/decrement', payload: 3})}>decrement 3</button>
    </>
  )
}

createRoot(document.getElementById('redux-performance-optimization-app'))
.render(
  <Provider store={store}>
    <ShoppingApp/>
    <CounterApp/>
  </Provider>
)
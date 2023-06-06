// redux性能优化 (查看每个reducer执行的时间)
const productList = [
  { id: 1, name: 'iPhone', price: 5999, quantity: 10 },
  { id: 2, name: 'Watch', price: 3199, quantity: 4 },
  { id: 3, name: 'Mac', price: 8999, quantity: 13 },
  { id: 4, name: 'iPods', price: 2999, quantity: 6 }
]

const shopCarReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case 'shoppingcar/increment': {
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
const reducers = combineReducers({
  car: shopCarReducer
})
const store = createStore(reducers)

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

const ShoppingApp = () => {
  return (
    <ProductList/>
  )
}

createRoot(document.getElementById('redux-performance-optimization-app'))
.render(
  <Provider store={store}>
    <ShoppingApp/>
  </Provider>
)
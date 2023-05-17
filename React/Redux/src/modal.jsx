function toggle(payload) {
  return {
    type: 'toggle',
    payload
  }
}
function reducer(state = false, action) {
  const { type, payload } = action
  switch(type) {
    case 'toggle':
      return payload;
    default:
      return state
  }
}
const store = createStore(reducer)

function Button() {
  const dispatch = useDispatch()
  return (
    <window.React.Fragment>
      <button onClick={() => dispatch(toggle(true))}>show</button>
      <button onClick={() => dispatch(toggle(false))}>hide</button>
    </window.React.Fragment>
  )
}
const styles = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  height: 200,
  background: '#fff',
  border: '1px solid #e8e8e8',
  boxShadow: '0 2px 10px 0 rgba(0,0,0,.1)'
}
function Modal() {
  const show = useSelector(state => state)
  if(show) {
    return <div style={styles}></div>
  }
  return null
}


function App() {
  return (
    <window.React.Fragment>
      <Button/>
      <Modal/>
    </window.React.Fragment>
  )
}
const root = createRoot(document.querySelector('#modal-app'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

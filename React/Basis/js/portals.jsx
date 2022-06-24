const { createRoot, createPortal } = window.ReactDOM
const { useRef, useState, useEffect } = window.React
const portals_root = createRoot(document.getElementById('portals-app'))

/* const wrapper_style = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:'rgba(0, 0, 0, .65)',
  zIndex: 100
}
const container_style = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '400px',
  height: '400px',
  background: '#fff',
  transform: 'translate(-50%, -50%)'
}
 */
/* function DialogComponent() {
  const wrapperRef = useRef(null)
  const handleClose = () => {
    document.body.removeChild(wrapperRef.current)
  }
  const element = (
    <div style={wrapper_style} ref={wrapperRef}>
      <div style={container_style}>
        <button onClick={handleClose}>close</button>
      </div>
    </div>
  )
  // return element
  return window.ReactDOM.createPortal(element, document.body)
}
 */
class Modal extends window.React.Component {
  constructor(props) {
    super(props)
    this.element = document.createElement('div')
  }
  componentDidMount() {
    document.body.appendChild(this.element)
  }
  componentWillUnmount() {
    document.body.removeChild(this.element)
  }
  render() {
    return window.ReactDOM.createPortal(this.props.children, this.element)
  }
}

function ChildComponent() {
  return (
    <button>click me</button>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count => count+1)
  }
  useEffect(() => {
    document.title = `you clicked ${count} times`
  }, [count])
  return (
    <div onClick={handleClick}>
      <Modal>
        <ChildComponent/>
      </Modal>
    </div>
  )
}

portals_root.render(
  <App/>
)

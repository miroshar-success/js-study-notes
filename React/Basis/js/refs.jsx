const { createRoot } = window.ReactDOM
const refs_app = createRoot(document.getElementById('refs-app'))

class InputClassComponent extends window.React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      inputRef: null
    }
  }
  handleFocus = () => {
    this.state.inputRef.focus()
  }
  render() {
    return (
      <div>
        <input type='text' ref={element => this.state.inputRef = element}/>
        <button onClick={this.handleFocus}>click</button>
      </div>
    )
  }
}

function InputFunctionComponent() {
  const [inputRef, setInputRef] = useState(null)
  const handleClick = () => {
    inputRef.focus()
  }
  return (
    <div>
      <input type='text' ref={element => setInputRef(element)}/>
      <button onClick={handleClick}>click</button>
    </div>
  )
}
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
refs_app.render(
  <div>
    <InputFunctionComponent/>
    <InputClassComponent/>
    <ListOfTenThings/>
  </div>
)

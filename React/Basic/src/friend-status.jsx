class ClassFriendStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOnline: false
    }
  }
  componentDidMount() {
    console.log(`开始监听 ${this.props.name} 状态`)
  }
  componentWillUnmount() {
    console.log(`取消监听 ${this.props.name} 状态`)
  }
  componentDidUpdate(prevProps) {
    console.log(`取消监听 ${prevProps.name} 状态`)
    console.log(`开始监听 ${this.props.name} 状态`)
  }
  render() {
    const { name, id } = this.props
    const { isOnline } = this.state
    return (
      <li>
        <span>{name} </span>
        <span style={{
          color: isOnline ? 'green' : 'red'
        }}>{isOnline ? '在线': '下线'}</span>
      </li>
    )
  }
}

const FunctionFriendStatus = (props) => {
  useEffect(() => {
    console.log(`开始监听 ${props.name} 状态 ------ function`)
    return () => {
      console.log(`取消监听 ${props.name} 状态 ----- function`)
    }
  })
}

const friendList = [
  {id: 1, isOnline: true, name: 'kyrie' },
  {id: 2, isOnline: false, name: 'durant' },
  {id: 3, isOnline: true, name: 'james' }
]

const App = () => {
  const [friend, setFriend] = useState(0)
  const handleToggleFriend = () => {
    if (friend === friendList.length - 1) {
      setFriend(0)
    } else {
      setFriend(friend + 1)
    }
  }
  return (
    <>
      <button onClick={handleToggleFriend}>切换好友</button>
      <ClassFriendStatus {...friendList[friend]}/>
      <FunctionFriendStatus {...friendList[friend]}/>
    </>
  )
}

createRoot(document.getElementById('friend-status-app')).render(<App/>)
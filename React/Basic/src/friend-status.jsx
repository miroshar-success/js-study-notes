class ClassFriendStatus extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(`开始监听 ${this.props.name} 状态`)
  }
  componentWillUnmount() {
    console.log(`取消监听 ${this.props.name} 状态`)
  }
  render() {
    const {name, isOnline} = this.props
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

const App = () => {
  const [friendList, setFriendList] = useState([
    {id: 1, isOnline: true, name: 'kyrie' },
    {id: 2, isOnline: false, name: 'durant' },
    {id: 3, isOnline: true, name: 'james' }
  ])
  return (
    <ul>
      { friendList.map(item => <ClassFriendStatus {...item} key={item.id}/>)}
    </ul>
  )
}

createRoot(document.getElementById('friend-status-app')).render(<App/>)
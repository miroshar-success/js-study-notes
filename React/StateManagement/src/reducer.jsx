let nextId = 3
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false }
]

const journeyReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case 'added':
      return [...state, {
        id: payload.id,
        text: payload.text,
        done: false
      }]
    case 'delete':
      return state.filter(item => item.id !== payload.id)
    case 'toggle':
      return state.map(item => {
        if (item.id === payload.id) return Object.assign({}, item, { done: !item.done })
        return item
      })
  }
}

const AddTask = ({onAddTask}) => {
  const [text, setText] = useState('')
  const handleAddJourney = () => {
    onAddTask(text)
  }
  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={handleAddJourney}>添加</button>
    </div>
  )
}
const JourneyList = ({ list, onToggle, onDelete }) => {
  return (
    <ul>
      { list.map(item => (
        <li key={item.id}>
          <input type='checkbox' onChange={() => onToggle(item.id)}/>
          <span>{item.text}</span>
          <button onClick={() => onDelete(item.id)}>删除</button>
        </li>
      ))}
    </ul>
  )
}

const JourneyApp = () => {
  const [journeyList, dispatch] = useReducer(journeyReducer, initialTasks)
  const handleAddTask = (text) => {
    dispatch({
      type: 'added',
      payload: {
        text,
        id: nextId++
      }
    })
  }
  const handleToggleTask = (id) => {
    dispatch({
      type: 'toggle',
      payload: {
        id
      }
    })
  }
  const handleDeleteTask = (id) => {
    dispatch({
      type: 'delete',
      payload: {
        id
      }
    })
  }
  return (
    <>
      <h3>布拉格的行程安排</h3>
      <AddTask onAddTask={handleAddTask}/>
      <JourneyList
        list={journeyList}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </>
  )
}

createRoot(document.querySelector('#reducer-app'))
.render(
  <>
    <JourneyApp/>
  </>
)
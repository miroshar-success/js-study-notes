const CityTest = () => {
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('typing')
  const handleContentChanged = (e) => {
    setAnswer(e.target.value.trim())
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const v = await submit()
    } catch (err) {
      console.log(err)
      setError(err.toString())
    }
    setStatus('typing')
  }
  const submit = () => {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const n = Math.random()
        if (n > 0.2) {
          resolve('true')
        } else {
          reject(new Error('something went wrong'))
        }
      }, 2000)
    })
  }
  return (
    <div>
      <h2>城市测验</h2>
      <p>哪个城市有把空气变成饮用水的广告牌？</p>
      <form onSubmit={handleSubmit}>
        <textarea value={answer} onChange={handleContentChanged}></textarea>
        <input type="submit" disabled={(answer.length === 0) || (status === 'submitting') }/>
      </form>
      { error && <p>{error}</p> }
    </div>
  )
}

/**
 * @description 选择状态结构
*/
const FullName = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const handleFirstNameChanged = (e) => {
    setFirstName(e.target.value.trim())
  }
  const handleLastNameChanged = (e) => {
    setLastName(e.target.value.trim())
  }
  const fullName = firstName + ',' + lastName
  return (
    <div>
      <div>
        姓:
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChanged}
        />
      </div>
      <div>
        名: <input
          type="text"
          value={lastName}
          onChange={handleLastNameChanged}
        />
      </div>
      <div>你的票 将发给: {fullName }</div>
    </div>
  )
}

/**
 * @description 状态提升
*/
function Panel ({ title, children, isActive, onShow }) {
  return (
    <section>
      <h3>{title}</h3>
      { isActive ? (<p>{children}</p>) : <button onClick={onShow}>显示</button> }
    </section>
  )
}
const StatePromote = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  return (
    <>
      <h3>Almaty, Kazakhstan</h3>
      <Panel
        title='关于'
        isActive={ activeIdx === 0 }
        onShow={ () => setActiveIdx(0) }
      >
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。在1929年至1997年之间，它是该国首都
      </Panel>
      <Panel
        title='词源'
        isActive={ activeIdx === 1 }
        onShow={ () => setActiveIdx(1) }
      >
        这个名字源于哈萨克语 алма，是“苹果”的意思，通常被翻译成“满是苹果”。事实上，阿拉木图周围的地区被认为是苹果的祖籍，Malus sieversii 被认为是目前本土苹果的祖先。
      </Panel>
    </>
  )
}

/**
 * @description 状态保留和重置
*/
const ContactList = ({ selectedContact, contacts, onSelect }) => {
  return (
    <section>
      <ul>
        { contacts.map(contact => (
          <li key={contact.email}>
            <button onClick={() => onSelect(contact)}>{contact.name}</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
const Chat = ({ contact }) => {
  const [content, setContent] = useState('')
  return (
    <section>
      <textarea
        value={content}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setContent(e.target.value.trim())}
      ></textarea>
      <br />
      <button>发送给 {contact.email}</button>
    </section>
  )
}
const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
]

const Messenger = () => {
  const [to, setTo] = useState(contacts[0])
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      {/* <Chat contact={to} key={to.email}/> */}
      <Chat contact={to}/>
    </div>
  )
}

/**
 * @description 提取状态逻辑到reducer中
*/
const taskReducer = (tasks, action) => {
  const { type, payload } = action
  switch (type) {
    case 'increment': {
      const { id, text } = payload
      return [...tasks, {
        id,
        text,
        done: false
      }]
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.payload.id) {
          return action.payload
        }
        return t
      })
    }
    case 'deleted': {
      return tasks.filter(task => task.id !== payload.id)
    }
  }
}
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '列侬墙图片', done: false }
]
let nextId = 3

const AddTask = ({onAddTask}) => {
  const [text, setText] = useState('')
  const handleAddTask = () => {
    onAddTask(text)
  }
  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value.trim())}/>
      <button onClick={handleAddTask}>添加</button>
    </div>
  )
}

const TaskList = ({ tasks, onChangeTask, onDeleteTask }) => {
  return (
    <ul>
      { tasks.map(task => (
        <li key={task.id}>
          <input type="checkbox" value={task.done} onChange={() => onChangeTask(task)}/>
          <span>{task.text}</span>
          <button onClick={() => onDeleteTask(task.id)}>删除</button>
        </li>
      ))}
    </ul>
  )
}


const TaskApp = () => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
  const handleAddTask = (text) => {
    console.log(text)
    dispatch({
      type: 'increment',
      payload: {
        text,
        id: nextId++,
      }
    })
  }
  const handleChangeTask = (task) => {
    dispatch({
      type: 'changed',
      payload: {
        id: task.id
      }
    })
  }
  const handleDeleteTask = (taskId) => {
    dispatch({
      type: 'deleted',
      payload: {
        id: taskId
      }
    })
  }
  return (
    <>
      <h3>布拉格行程</h3>
      <AddTask onAddTask={handleAddTask}/>
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  )
}

/**
 * @description 使用context和reducer进行扩展
*/
const TaskProviderApp = (function () {
  const taskReducer = (tasks = [], action) => {
    const { type, payload } = action
    switch (type) {
      case 'increment':
        return [...tasks, {
          id: payload.id,
          text: payload.text,
          completed: false
        }]
      case 'toggle': {
        return tasks.map(task => {
          if (task.id === payload.id) {
            return Object.assign({}, task, { completed: !task.completed })
          }
        })
      }
      case 'delete':
        return tasks.filter(task => task.id !== payload.id)
    }
  }
  const initialTasks = [
    { id: 0, text: '哲学家之路', done: true },
    { id: 1, text: '参观寺庙', done: false },
    { id: 2, text: '喝抹茶', done: false }
  ]
  const TaskContext = createContext(null)
  const TaskDispatchContext = createContext(null)
  const TaskProvider = ({children}) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
    return (
      <TaskContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
          {children}
        </TaskDispatchContext.Provider>
      </TaskContext.Provider>
    )
  }
  const useTasks = () => useContext(TaskContext)
  const useTaskDispatch = () => useContext(TaskDispatchContext)
  const AddTask = () => {
    const dispatch = useTaskDispatch()
    const [text, setText] = useState('')
    const handleAddTask = () => {
      dispatch({
        type: 'increment',
        payload: {
          text,
          completed: false,
          id: nextId++
        }
      })
      setText('')
    }
    return (
      <div>
        <input
          type="text"
          placeholder='添加任务'
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={handleAddTask}>添加</button>
      </div>
    )
  }
  const TaskList = () => {
    const tasks = useTasks()
    const dispatch = useTaskDispatch()
    const handleDeleteTask = (task) => {
      dispatch({
        type: 'delete',
        payload: {
          id: task.id
        }
      })
    }
    return (
      <ul>
        { tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox"/>
            <span>{task.text}</span>
            <button onClick={() => handleDeleteTask(task)}>删除</button>
          </li>
        ))}
      </ul>
    )
  }
  const TaskApp = () => {
    return (
      <TaskProvider>
        <h3>在京都休息一天</h3>
        <AddTask/>
        <TaskList/>
      </TaskProvider>
    )
  }
  return TaskApp
})()

createRoot(document.getElementById('statement-management-app'))
.render(
  <>
    <CityTest/>
    <FullName/>
    <StatePromote/>
    <Messenger/>
    <TaskApp/>
    <hr />
    <TaskProviderApp/>
  </>
)
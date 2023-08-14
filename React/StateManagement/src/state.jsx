/**
 * @description state设置原则: 合并关联的state
*/
const MoveDot = () => {
  const containerRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [top, setTop] = useState(0)
  const handleSetPosition = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY - top
    })
  }
  useEffect(() => {
    const rect = containerRef.current.getBoundingClientRect()
    setTop(rect.top)
  }, [])
  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: 500,
        height: 500,
        border: '1px solid red'
      }}
      onPointerMove={handleSetPosition}
    >
      <div style={{
        position: 'absolute',
        background: 'red',
        borderRadius: '50%',
        left: -10,
        top: -10,
        width: 20,
        height: 20,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}></div>
    </div>
  )
}

/**
 * @description state设计原则: 避免矛盾的state
*/
const FeedbackForm = () => {
  const sendMessage = (text) => {
    return new Promise(resolve => setTimeout(resolve, 2500))
  }
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const handleSubmit = async (e) => {
    // isSending 和 isSent 不应同时为true (可能会出现这样的情况)
    e.preventDefault()
    setIsSending(true)
    await sendMessage(text)
    setIsSending(false)
    setIsSent(true)
  }
  if (isSent) {
    return <h3>Thanks for feedback</h3>
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea value={text} onChange={e => setText(e.target.value)} style={{ width: 100, height: 60 }}/>
      <br/>
      <button disabled={isSending} type={'submit'}>Send</button>
      { isSending && <p>Sending...</p>}
    </form>
  )
}

const FeedbackStatusForm = () => {
  const sendMessage = (text) => {
    return new Promise(resolve => setTimeout(resolve, 2500))
  }
  const [text, setText] = useState('')
  const [status, setStatus] = useState('typing')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await sendMessage()
    setStatus('sent')
  }
  const isSending = status === 'sending'
  const isSent = status === 'sent'
  if (isSent) {
    return <h3>Thanks for feedback</h3>
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        style={{ width: 300, height: 60 }}
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      ></textarea>
      <button type='submit' disabled={isSending}>Send</button>
      { isSending && <p>Sending...</p>}
    </form>
  )
}

/**
 * @description state的设计原则: 避免冗余的state
*/
const FullNameForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const handleFirstNameChanged = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChanged = (e) => {
    setLastName(e.target.value)
  }
  const fullName =( firstName || lastName) ? (firstName + '-' + lastName) : '';
  return (
    <div>
      <div>
        FirstName: <input type="text" value={firstName} onChange={handleFirstNameChanged}/>
      </div>
      <div>
        LastName: <input type="text" value={lastName} onChange={handleLastNameChanged}/>
      </div>
      <div>{fullName}</div>
    </div>
  )
}

/**
 * @description state的设计原则: 避免重复的state
*/
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 }
]
// selectedItem和items中的一项是重复的
const Menu = () => {
  const [items, setItems] = useState(initialItems)
  const [selectedItem, setSelectedItem] = useState(items[0])
  return (
    <>
      <h3>What's your travel snack?</h3>
      <ul>
        { items.map(item => (
          <li key={item.id}> {item.title} {' '} <button onClick={() => setSelectedItem(item)}>choose</button></li>
        )) }
      </ul>
      <p>You picked { selectedItem.title }</p>
    </>
  )
}
// 包含更新功能
const UpdateMenu = (function () {
  const Menu = () => {
    const [items, setItems] = useState(initialItems)
    const [selectedId, setSelectedId] = useState(0)
    // const [selectedItem, setSelectedItem] = useState(items[0])
    const handleItemChange = (id, event) => {
      setItems(items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            title: event.target.value.trim()
          }
        }
        return item
      }))
    }
    const selectedItem = items.find(item => item.id === selectedId)
    return (
      <>
        <h3>What's your travel snack?</h3>
        <ul>
          { items.map(item => (
            <li key={item.id}>
              <input type="text" value={item.title} onChange={e => handleItemChange(item.id, e)}/>
              {' '}
              <button onClick={() => setSelectedId(item.id)}>Choose</button>
            </li>
          )) }
        </ul>
        <p>You picked {selectedItem.title}.</p>
      </>
    )
  }
  return Menu
})()

/**
 * @description state设计原则: 避免深度嵌套的数据
*/
const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [{
    id: 1,
    title: 'Earth',
    childPlaces: [{
      id: 2,
      title: 'Africa',
      childPlaces: [{
        id: 3,
        title: 'Botswana',
        childPlaces: []
      }, {
        id: 4,
        title: 'Egypt',
        childPlaces: []
      }, {
        id: 5,
        title: 'Kenya',
        childPlaces: []
      }, {
        id: 6,
        title: 'Madagascar',
        childPlaces: []
      }, {
        id: 7,
        title: 'Morocco',
        childPlaces: []
      }, {
        id: 8,
        title: 'Nigeria',
        childPlaces: []
      }, {
        id: 9,
        title: 'South Africa',
        childPlaces: []
      }]
    }, {
      id: 10,
      title: 'Americas',
      childPlaces: [{
        id: 11,
        title: 'Argentina',
        childPlaces: []
      }, {
        id: 12,
        title: 'Brazil',
        childPlaces: []
      }, {
        id: 13,
        title: 'Barbados',
        childPlaces: []
      }, {
        id: 14,
        title: 'Canada',
        childPlaces: []
      }, {
        id: 15,
        title: 'Jamaica',
        childPlaces: []
      }, {
        id: 16,
        title: 'Mexico',
        childPlaces: []
      }, {
        id: 17,
        title: 'Trinidad and Tobago',
        childPlaces: []
      }, {
        id: 18,
        title: 'Venezuela',
        childPlaces: []
      }]
    }, {
      id: 19,
      title: 'Asia',
      childPlaces: [{
        id: 20,
        title: 'China',
        childPlaces: []
      }, {
        id: 21,
        title: 'India',
        childPlaces: []
      }, {
        id: 22,
        title: 'Singapore',
        childPlaces: []
      }, {
        id: 23,
        title: 'South Korea',
        childPlaces: []
      }, {
        id: 24,
        title: 'Thailand',
        childPlaces: []
      }, {
        id: 25,
        title: 'Vietnam',
        childPlaces: []
      }]
    }, {
      id: 26,
      title: 'Europe',
      childPlaces: [{
        id: 27,
        title: 'Croatia',
        childPlaces: [],
      }, {
        id: 28,
        title: 'France',
        childPlaces: [],
      }, {
        id: 29,
        title: 'Germany',
        childPlaces: [],
      }, {
        id: 30,
        title: 'Italy',
        childPlaces: [],
      }, {
        id: 31,
        title: 'Portugal',
        childPlaces: [],
      }, {
        id: 32,
        title: 'Spain',
        childPlaces: [],
      }, {
        id: 33,
        title: 'Turkey',
        childPlaces: [],
      }]
    }, {
      id: 34,
      title: 'Oceania',
      childPlaces: [{
        id: 35,
        title: 'Australia',
        childPlaces: [],
      }, {
        id: 36,
        title: 'Bora Bora (French Polynesia)',
        childPlaces: [],
      }, {
        id: 37,
        title: 'Easter Island (Chile)',
        childPlaces: [],
      }, {
        id: 38,
        title: 'Fiji',
        childPlaces: [],
      }, {
        id: 39,
        title: 'Hawaii (the USA)',
        childPlaces: [],
      }, {
        id: 40,
        title: 'New Zealand',
        childPlaces: [],
      }, {
        id: 41,
        title: 'Vanuatu',
        childPlaces: [],
      }]
    }]
  }, {
    id: 42,
    title: 'Moon',
    childPlaces: [{
      id: 43,
      title: 'Rheita',
      childPlaces: []
    }, {
      id: 44,
      title: 'Piccolomini',
      childPlaces: []
    }, {
      id: 45,
      title: 'Tycho',
      childPlaces: []
    }]
  }, {
    id: 46,
    title: 'Mars',
    childPlaces: [{
      id: 47,
      title: 'Corn Town',
      childPlaces: []
    }, {
      id: 48,
      title: 'Green Hill',
      childPlaces: []      
    }]
  }]
}
const PlaceTree = ({ place }) => {
  const childPlaces = place.childPlaces || []
  return (
    <li>
      {place.title}
      { childPlaces.length > 0 && (
        <ol>
          {
            childPlaces.map(place => (<PlaceTree key={place.id} place={place}/>))
          }
        </ol>
      )}
    </li>
  )
}
const TravelPlan = () => {
  const [plan, setPlan] = useState(initialTravelPlan)
  const planets = plan.childPlaces
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        { planets.map(place => (<PlaceTree key={place.id} place={place}/>))}
      </ol>
    </>
  )
}

/**
 * @description 修改上面的例子
*/
// 将数组更改为对象映射关系
const create_travel_map = (obj) => {
  const map = { }
  const map_list = (data) => {
    const { id, title, childPlaces = [] } = data
    if (map[id] === undefined) {
      map[id] = {
        id: id,
        title,
        children: []
      }
    }
    childPlaces.forEach(item => {
      map[id].children.push(item.id)
      map_list(item)
    })
  }
  map_list(obj)
  return map
}
console.log(create_travel_map(initialTravelPlan))
/**
 * @description 扁平化处理数据之后
*/
const FlatPlaceTree = ({id, parentId, placesById}) => {
  const place = placesById[id]
  const children = place.children || []
  return (
    <li>
      {place.title}
      <button>Complete</button>
      { children.length > 0 && (
        <ol>
          {
            children.map(childId => (
              <FlatPlaceTree
                key={childId}
                id={childId}
                parentId={id}
                placesById={placesById}
              />
            ))
          }
        </ol>
      )}
    </li>
  )
}
const FlatTravelList = () => {
  const [plan, setPlan] = useState(create_travel_map(initialTravelPlan))
  // 根节点
  const root = plan[0]
  // 根节点下的子节点
  const planetIds = root.children || [];
  return (
    <>
      <h3>Places to visit</h3>
      <ol>
        {planetIds.map(id => (
          <FlatPlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
          />
        ))}
      </ol>
    </>
  )
}

createRoot(document.querySelector('#state-app'))
.render(
  <>
    <MoveDot/>
    <FeedbackForm/>
    <FeedbackStatusForm/>
    <hr />
    <FullNameForm/>
    <hr />
    <Menu/>
    <hr />
    <UpdateMenu/>
    <hr/>
    <TravelPlan/>
    <hr/>
    <FlatTravelList/>
  </>
)
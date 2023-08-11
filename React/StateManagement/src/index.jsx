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

createRoot(document.getElementById('statement-management-app'))
.render(
  <>
    <CityTest/>
    <FullName/>
    <StatePromote/>
  </>
)
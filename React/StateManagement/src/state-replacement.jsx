/**
 * @description 状态保留和重置
*/
const Counter = ({ style, isFancy }) => {
  const [score, setScore] = useState(0)
  return (
    <div style={{ display: 'inline-block', width: 100, textAlign: 'center', ...style }}>
      <h3 style={{color: isFancy ? 'red' : '#000'}}>{ score }</h3>
      <button onClick={() => setScore(score + 1)}>加一</button>
    </div>
  )
}

const CounterApp = () => {
  const [visible, setIsVisible] = useState(true)
  const [isFancy, setIsFancy] = useState(false)
  return (
    <>
      {/* 相同位置的相同组件会使得state被保留下来 */}
      { isFancy ? <Counter isFancy={true}/> : <Counter isFancy={false}/>}
      <Counter style={{ display: visible ? 'inline-block' : 'none'}}/>
      <div>
        <label>
          <input type="checkbox" checked={visible} onChange={e => setIsVisible(e.target.checked)}/>
          渲染第二个计数器
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isFancy} onChange={e => setIsFancy(e.target.checked)}/>
          使用好看的样式
        </label>
      </div>
    </>
  )
}

/**
 * @description 相同位置不同组件会重置state
*/
const PausedCounter = () => {
  const [isPaused, setIsPaused] = useState(false)
  return (
    <div>
      { isPaused ? <p>待会见!</p> : (<Counter/>)}
      <div>
        <label htmlFor="">
          <input type="checkbox" checked={isPaused} onChange={e => setIsPaused(e.target.checked)}/>
          暂停
        </label>
      </div>
    </div>
  )
}

/**
 * @description 嵌套不同的标签, 组件位置相同 数据也会重置
*/
const FancyCounter = () => {
  const [isFancy, setIsFancy] = useState(false)
  return (
    <div>
      {/* 切换状态时 返回的counter组件被不同的标签包裹, 子组件从DOM中被移除, 状态也都被销毁了 */}
      { isFancy ? 
        (<div><Counter isFancy={isFancy} /></div>)
        : (<section><Counter isFancy={isFancy}/></section>)
      }
      <label>
        <input type="checkbox" checked={isFancy} onChange={e => setIsFancy(e.target.checked)}/>
        修改样式
      </label>
    </div>
  )
}

/**
 * @description 保留state, 要将组件定义在最上层
*/
const MyComponent = () => {
  const [counter, setCounter] = useState(0)
  // 每次渲染时都会创建一个不同的 FieldText 函数, 相同位置渲染的是不同的组件。
  const FieldText = () => {
    const [text, setText] = useState('')
    return (
      <input value={text} onChange={e => setText(e.target.value)}/>
    )
  }
  return (
    <>
      <FieldText/>
      <button onClick={() => setCounter(counter + 1)}>点击了{counter}次</button>
    </>
  )
}

/**
 * @description 相同位置重置state (默认情况下, React会在一个组件保持在相同位置时保留它的state。)
*/
const Score = ({ person }) => {
  const [score, setScore] = useState(0)
  return (
    <div>
      <h3>{person}的分数: {score}</h3>
      <button onClick={() => setScore(score + 1)}>加一</button>
    </div>
  )
}
// key 能够让React辨别它们是不同的计数器。因此它们永远都不会共享state。
const ScoreBoard = () => {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div>
      {/* { isPlayerA ? <Score person='Taylor'/> : <Score person='Sarah'/>} */}

      {/* 第一种方式: 将两个组件渲染在不同位置 */}
{/*       {isPlayerA && <Score person='Taylor'/>}
      {!isPlayerA && <Score person='Sarah'/>} */}

      {/* 第二种方式: 使用key来重置state */}
      { isPlayerA ? <Score person='Taylor' key='Taylor'/> : <Score person='Sarah' key='Sarah'/>}
      <button onClick={() => setIsPlayerA(!isPlayerA)}>下一位玩家!</button>
    </div>
  )
}


createRoot(document.querySelector('#state-replacement-app'))
.render(
  <>
    <CounterApp/>
    <PausedCounter/>
    <hr/>
    <FancyCounter/>
    <hr/>
    <MyComponent/>
    <hr />
    <ScoreBoard/>
  </>
)
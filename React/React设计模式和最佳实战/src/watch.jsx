// 将当前ms 转换为 hh:mm:ss:ms 显示
const formatTimestamp = (milliseconds) => {
  let time = milliseconds
  const millisecond = milliseconds % 1000
  time = (milliseconds - millisecond) / 1000  // 总共多少秒
  const second = time % 60  // 秒
  time = (time - second) / 60 // 总共多少分钟
  const minute = time % 60 // 分钟
  const hour = (time - minute) / 60
  const paddingLeftZero = (s, l = 2) => s.toString().padStart(l, '0')
  return `${paddingLeftZero(hour)} : ${paddingLeftZero(minute)} : ${paddingLeftZero(second)}.${paddingLeftZero(millisecond, 3)}`
}
const styles = {fontFamily: 'monospace'}
const CurrentTime = memo(({milliseconds}) => {
  return (<h2 style={styles}>{formatTimestamp(milliseconds)}</h2>)
})

const CountrolButton = memo(({isActive, onStart, onPaused, onCounter, onReset}) => {
  return (
    <div>
      {isActive ? (
        <>
          <button onClick={onCounter}>计次</button>
          <button onClick={onPaused}>暂停</button>
        </>
      )
        : (
          <>
            <button onClick={onReset}>复位</button>
            <button onClick={onStart}>启动</button>
          </>
        )
      }
    </div>
  )
})

const SplitTimes = memo(({times}) => {
  return (
    <ul>
      { times.map((time, i) => (
        <li key={i}>
          <span>计次 {i+1} ----- :</span>
          <span>{formatTimestamp(time)}</span>
        </li>
      ))}
    </ul>
  )
})

const getTimestamp = () => Date.now()

const WatchApp = () => {
  const [times, setTimes] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [startTimestamp, setStartTimestamp] = useState(getTimestamp())
  const [currentTimestamp, setCurrentTimestamp] = useState(getTimestamp())
  // const [millisecondList, setMillisecondList] = useState([])
  const [pausedMillisecond, setPausedMillisecond] = useState(0)
  const timerRef = useRef(null)
  const start = () => {
    timerRef.current = window.requestAnimationFrame(() => {
      setCurrentTimestamp(getTimestamp())
      start()
    })
  }
  const handleStart = useCallback(() => {
    setIsActive(true)
    setStartTimestamp(getTimestamp())
    start()
  }, [])
  const handlePaused = () => {
    // 暂停,
    setIsActive(false)
    window.cancelAnimationFrame(timerRef.current)
    // setMillisecondList(t => t.concat(currentTimestamp - startTimestamp))
    // 设置暂停时的数据
    setPausedMillisecond(t => t + currentTimestamp - startTimestamp)
    const timestamp = getTimestamp()
    setStartTimestamp(timestamp)
    setCurrentTimestamp(timestamp)
  }

/*   const secondsTotal = useMemo(() => {
    return millisecondList.reduce((prev, next) => prev + next, 0)
  }, [millisecondList]) */

  const handleReset = useCallback(() => {
    const t = getTimestamp()
    setStartTimestamp(t)
    setCurrentTimestamp(t)
    setPausedMillisecond(0)
  }, [])
  const handleCounter = () => {
    // 将当前的时间 添加列表
    setTimes(times => times.concat(pausedMillisecond + currentTimestamp - startTimestamp))
    // 清空已有的数据
    setPausedMillisecond(0)
    // 重置开始时间戳 重新计算
    setStartTimestamp(getTimestamp())
  }
  return (
    <>
      <CurrentTime milliseconds={pausedMillisecond + currentTimestamp - startTimestamp}/>
      <CountrolButton
        isActive={isActive}
        onStart={handleStart}
        onPaused={handlePaused}
        onReset={handleReset}
        onCounter={handleCounter}
      />
      <SplitTimes times={times}/>
    </>
  )
}

createRoot(document.getElementById('watch-app'))
.render(
  <WatchApp/>
)
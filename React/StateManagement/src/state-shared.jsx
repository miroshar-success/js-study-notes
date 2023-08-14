/**
 * @description 组件状态提升
*/
const Panel = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <section className='panel'>
      <h3>{title}</h3>
      { isActive ? (<p>{children }</p>) : <button onClick={() => setIsActive(true)}>显示</button> }
    </section>
  )
}
const Accordion = () => {
  return (
    <>
      <h2>哈萨克斯坦, 阿拉木图</h2>
      <Panel title='关于'>
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都
      </Panel>
      <Panel title='词源'>
        这个名字来自于 алма，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，Malus sieversii 被认为是现今苹果的祖先。
      </Panel>
    </>
  )
}

/**
 * @description 状态提升之后
*/
const PanelState = ({title, isActive, onShow, children }) => {
  return (<section>
    <h3>{title}</h3>
    { isActive ? <p>{children}</p> : (<button onClick={onShow}>显示</button>)}
  </section>)
}
const AccordionStatePromote = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  return (
    <>
      <h2>哈萨克斯坦, 阿拉木图</h2>
      <PanelState
        title='关于'
        isActive={ activeIdx === 0 }
        onShow={() => setActiveIdx(0)}
      >
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都
      </PanelState>
      <PanelState
        title='词源'
        isActive={ activeIdx === 1 }
        onShow={() => setActiveIdx(1) }
      >
        这个名字来自于 алма，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，Malus sieversii 被认为是现今苹果的祖先
      </PanelState>
    </>
  )
}

createRoot(document.querySelector('#state-shared-app'))
.render(
  <>
    <Accordion/>
    <hr />
    <AccordionStatePromote/>
  </>
)
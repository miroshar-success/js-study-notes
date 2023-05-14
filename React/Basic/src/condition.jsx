const Item = ({ isPacked, name }) => {
  return (
    <li>
      { isPacked ? (<del>{ name } ✔ </del>) : name}
    </li>
  )
}

const PackingList = () => {
  return (
    <section>
      <div>Sally Ride 的行李清单</div>
      <ul>
        <Item isPacked={true} name='宇航服'/>
        <Item isPacked={true} name='带金箔的头盔'/>
        <Item isPacked={false} name='Tam 的照片'/>
      </ul>
    </section>
  )
}

const App = () => (
  <>
    <PackingList/>
  </>
)

ReactDOM.createRoot(document.getElementById('condition-app')).render(<App/>)
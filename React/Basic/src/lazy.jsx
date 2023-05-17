const players = [
  {
    firstName: 'kyrie',
    lastName: 'irving',
    id: 1
  },
  {
    firstName: 'lebron',
    lastName: 'james',
    id: 2
  },
  {
    firstName: 'kevin',
    lastName: 'love',
    id: 3
  }
]
const Player = () => (
  <ul>
    {
      players.map(p => (<li key={p.id}>{p.firstName} - {p.lastName}</li>))
    }
  </ul>
)
const PlayerLazy = React.lazy(() => new Promise(resolve => {
  window.setTimeout(() => {
    resolve('hello')
  },3000)
}))

const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <PlayerLazy></PlayerLazy>
  </React.Suspense>
)

ReactDOM.createRoot(document.getElementById('lazy-app')).render(<App/>)
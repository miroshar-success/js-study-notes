const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
]
const PeopleList = () => (
  <ul>
    { people.map(p => (<li key={p}>{p}</li>))}
  </ul>
)

const peoples = [
  {
    id: 0,
    name: '凯瑟琳·约翰逊',
    profession: '数学家',
  },
  {
    id: 1,
    name: '马里奥·莫利纳',
    profession: '化学家',
  },
  {
    id: 2,
    name: '穆罕默德·阿卜杜勒·萨拉姆',
    profession: '物理学家',
  },
  {
    id: 3,
    name: '珀西·莱温·朱利亚',
    profession: '化学家',
  },
  {
    id: 4,
    name: '苏布拉马尼扬·钱德拉塞卡',
    profession: '天体物理学家',
  }
]

const ChemistsList = () => (
  <ul>
    { peoples.filter(p => p.profession === '化学家').map(p => (
      <li key={p.id}>{p.name}</li>
    ))}
  </ul>
)

const App = () => (
  <>
    <PeopleList/>
    <ChemistsList/>
  </>
)
ReactDOM.createRoot(document.getElementById('list-app')).render(<App/>)
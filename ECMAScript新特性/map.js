// ----- map ------
const m1 = new Map()
const o = {p:'Hello World!'}
m1.set(o,'content')

console.log('m1:', m1)  // Map(1) { { p: 'Hello World!' } => 'content' }
console.log(m1.get(o))  // content
console.log(m1.has(o))  // true


// --------- 数组作为成员 ----------
const m2 = new Map([
  ['name','张三'],
  ['title','Author']
])
console.log('m2:',m2) // { 'name' => '张三', 'title' => 'Author' }
console.log(m2.has('name'))   // true
console.log(m2.get('name'))   // 张三
console.log(m2.has('title'))  // true
console.log(m2.get('title'))  // Author

// ---- 上面的操作相当于 -------
const item_map = new Map()
const items = [['hello', 'world'], ['你好', '生活']]
items.forEach(([key,value]) => {
  item_map.set(key,value)
})
console.log('item_map:', item_map)  //  Map(2) { 'hello' => 'world', '你好' => '生活' }


const array = [
  [{firstName:'kyrie'}, {lastName:'irving'}],
  [{firstName:'lebron'}, {lastName:'james'}]
]
console.log(new Map(array))
/*
Map(2) {
  { firstName: 'kyrie' } => { lastName: 'irving' },
  { firstName: 'lebron' } => { lastName: 'james' }
}
*/

// --------- set结构和map结构作为map的参数 -----------
const set = new Set([['foo',1], ['bar', 2]])
const m_1 = new Map([['foo',1], ['bar', 2]])

console.log(new Map(set)) // Map(2) { 'foo' => 1, 'bar' => 2 }
console.log(new Map(m_1)) // Map(2) { 'foo' => 1, 'bar' => 2 }

// --- 数组内存地址不一样 -----
const m3 = new Map()
m3.set(['a'],5)
console.log(m3.get(['a']));   // undefined

const m4 = new Map();
let k1 = ['a'], k2 = ['a'];
m4.set(k1,1111)
m4.set(k2,1111)

m4.set(+0,'+0')
m4.set(-0,'-0')

m4.set(NaN,'NaN1')
m4.set(NaN,'NaN2')
console.log('m4:', m4)  // Map(4) { [ 'a' ] => 1111, [ 'a' ] => 1111, 0 => '-0', NaN => 'NaN2' }

//------ 静态属性和方法 -------
// set(key,value)
// size()
// delete()  删除返回true, 删除失败返回false
// clear()   清空
const m5 = new Map();
const o1 = {firstName:'kyrie',lastName:'irving'}
const o2 = {firstName:'lebron',lastName:'james'}
m5.set(o1,o2)
m5.set(262,'standard')
m5.set('year',2021)
console.log('m5:',m5) /*m5: Map(3) {
  { firstName: 'kyrie', lastName: 'irving' } => { firstName: 'lebron', lastName: 'james' },
  262 => 'standard',
  'year' => 2021
}*/
console.log(m5.size)  // 3
console.log(m5.get(o1)) // { firstName: 'lebron', lastName: 'james' }
console.log(m5.has(o1)) // true
m5.delete(o1)   // true
console.log(m5) // Map(2) { 262 => 'standard', 'year' => 2021 }
console.log(m5.clear())
console.log(m5) // Map(0) {}
console.log(m5.size)  // 0



const map = new Map([
  ['F', 'foo'],
  ['T', 'yes']
])
for(let key of map.keys()) {
  console.log('key:', key)  // F  T
}

for(let value of map.values()){
  console.log('value:', value)  // foo yes
}

for(let [key,value] of map.entries()){
  console.log(key,value)  // F foo  T yes
}

console.log(Object.entries({"a":1, "b":2}))


for(const [key,value] of map){
  console.log('key',key, 'value:', value)
  /*
    key F value: foo
    key T value: yes
  */
}



const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c')
  .set(4, 'd')

const map1 = new Map([...map0].filter(([k,v]) => k > 2))
console.log('map1:',map1) // Map(2) { 3 => 'c', 4 => 'd' }

const map2 = new Map([...map0].map(([k,v]) => ([k, '_' + v])))
console.log('map2', map2) // Map(4) { 1 => '_a', 2 => '_b', 3 => '_c', 4 => '_d' }

// ---- map转为对象 ----
function mapToObject(map) {
  const object = Object.create(null)
  for(const [key,value] of map) {
    object[key] = value;
  }
  return object
}
console.log(mapToObject(map0), mapToObject(map1), mapToObject(map2))
// { '1': 'a', '2': 'b', '3': 'c', '4': 'd' }
// { '3': 'c', '4': 'd' }
// { '1': '_a', '2': '_b', '3': '_c', '4': '_d' }

// -------- map转为JSON ---------
// 1- 对象属性都是字符串
function mapToJson(map) {
  const object = mapToObject(map)
  return JSON.stringify(object)
}

const map4 = new Map().set('yes', true).set('hello', 'world')
console.log(mapToJson(map4))  // {"yes":true,"hello":"world"}

// 2- map 键名有非字符串
function mapToJson2(map) {
  const array = [...map]
  return JSON.stringify(array)
}
const map5 = new Map().set({name:'kyrie'},123).set('hello',{name:'irving'})
console.log(mapToJson2(map5)) // [[{"name":"kyrie"},123],["hello",{"name":"irving"}]]

// ----- object转为 map ------
function mapToJson(object) {
  const map = new Map()
  for(const [key,value] of Object.entries(object)){
    map.set(key,value)
  }
  return map
}
const lebron = {
  firstName: 'lebron',
  lastName: 'james',
  age: 30
}
console.log(mapToJson(lebron))  // { 'firstName' => 'lebron', 'lastName' => 'james', 'age' => 30 }


// ----- WeakMap 用途-------
const listener = new WeakMap()

listener.set(element, handler1)
listener.set(element, handler2)

element.addEventListener('click', listener.get(element), false)
element.addEventListener('click', listener.get(element), false)

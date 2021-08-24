const m1 = new Map()
const o = {p:'Hello World!'}
m1.set(o,'content')

console.log('m1:', m1)  // Map(1) { { p: 'Hello World!' } => 'content' }
console.log(m1.get(o))  // content
console.log(m1.has(o))  // true
console.log(m1.has(o))  // false


// --------------------- 数组作为成员
const m2 = new Map([
  ['name','张三'],
  ['title','Author']
])
console.log('m2:',m2)

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


// 键值覆盖
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
console.log('m4:', m4)

// ----------------------------- 静态属性和方法
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

// -----------------------------------
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
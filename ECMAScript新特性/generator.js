function * helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
const hw = helloWorldGenerator()
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())

console.log('function-type:', Object.getPrototypeOf(function* (){}).constructor)  // [Function: GeneratorFunction]

// ---------- 没有return 语句 -------------
function* player() {
  yield 'kyrie'
  yield 'irving'
}
const player_next = player()
console.log(player_next.next())
console.log(player_next.next())
console.log(player_next.next())
/*
{ value: 'kyrie', done: false }
{ value: 'irving', done: false }
{ value: undefined, done: true }
*/

// ------------------------------- generator ------------
function *f() {
  return '你好'
  return '世界'
}
console.log(f().next())

// ---------------------遍历器生成函数 -----------------
const obj = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  }
}
console.log([...obj]) // 1 2 3 4

// -------------------------------------- next方法的参数
function* f1() {
  for(var i = 0; true; i++) {
    var result = yield i;
    if(result) {
      i = -1
    }
  }
}
const g1 = f1()
console.log(g1.next())  // 0
console.log(g1.next())  // 1
console.log(g1.next())  // 2
console.log(g1.next(true))  // 0


const arrayLike = {
  0:'kyrie',
  1:'durant',
  2:'james',
  3:'wade'
}
function transfer(obj) {
  let temp = [];
  for(let player of Object.values(arrayLike)){
    temp.push(player)
  }
  return temp;
}
console.log(transfer(arrayLike))

const p1 = {
  firstName: 'Lei',
  lastName: 'Wang',
  get fullName() {
    return this.firstName + '' + this.lastName
  }
}
console.log('firstName:', p1.firstName)  // Lei

const p2 = Object.assign({}, p1)
p2.firstName = 'zce'
console.log('p2-fullName:', p2.fullName)
console.log(p2)

// Object.getOwnPropertyDescriptors
const descriptors = Object.getOwnPropertyDescriptors(p1);
console.log('descriptors:', descriptors)
const p3 = Object.defineProperties({},descriptors)
console.log('p3:', p3)

p3.firstName = 'kyrie'
console.log('fullName:', p3.fullName)

// ----------------- next方法参数-demo
function * generator(x) {
  var y = 2 * (yield (x+1))
  var z = yield (y/3)
  return (x + y + z)
}
var a = generator(5)
console.log(a.next())
console.log(a.next())
console.log(a.next())
console.log('a-------------------------------b')
const b = generator(5)
console.log(b.next()) // 6
console.log(b.next(12)) // 8
console.log(b.next(13)) // 5+24+13  42

// ----------------------- for-of循环遍历generator生成器
function * baz() {
  yield 1
  yield 2
  yield 3
  yield 4
  return 5
}
for(let item of baz()){
  console.log('item---:', item) // 1 2 3 4
}

// ------------------------ 给对象部署iterator接口
function * objectEntries() {
  let keys = Object.keys(this)
  for(let key of keys) {
    yield [key, this[key]]
  }
}
const my_object = {
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30,
  [Symbol.iterator]:objectEntries
}
for(let a of my_object){
  console.log('a:', a)
}


// ------------ Generator.prototype.return --------------
function* singer() {
  yield 'hello'
  yield 'world'
  yield '你好'
  yield '生活'
}

const s = singer()
s.next()
console.log(s.return('你好生活'))
console.log(s.next())
/*
{ value: '你好生活', done: true }
{ value: undefined, done: true }
*/

// ------------ 调用Generator -----------
function* m1() {
  yield 'hello'
  yield 'world'
}

function* m2() {
  console.log(this)
  yield '你好'
  yield* m1()
  yield '生活'
}

for(const item of m2()) {
  console.log('item---', item)
  /*
  item--- 你好
  item--- hello
  item--- world
  item--- 生活
  */
}

// ------------- generator this ------------
function* p5() {}
p5.prototype.hello = function(){ return 'hi' }
const p_next = p5()
console.log(p_next.hello()) // 'hi'


// ---------- 状态机 -------------
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
const c_next = clock()
console.log(c_next.next())
console.log(c_next.next())
console.log(c_next.next())
console.log(c_next.next())


function* Entries(obj) {
  const keys = Object.keys(obj)
  for (const key of keys) {
    yield [key, obj[key]]
  }
}

for(const [key, value] of Entries({
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
})) {
  console.log(key, value)
}
/*
firstName kyrie
lastName irving
age 30
*/



function* player_list() {
  yield 'lebron'
  yield 'james'
}
console.log([...player_list()])
console.log(Array.from(player_list()))
const [firstName, lastName] = player_list()
console.log(firstName, lastName)
/*
[ 'lebron', 'james' ]
[ 'lebron', 'james' ]
lebron james
*/


function* calc(x) {
  const y = 2 * (yield (x+1))
  const z = yield (y/3)
  return x + y + z
}
const calc_next = calc(5)
console.log(calc_next.next())
console.log(calc_next.next(12))
console.log(calc_next.next(13))
/*
{ value: 6, done: false }
{ value: 8, done: false }
{ value: 42, done: true }
*/

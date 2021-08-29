function * helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
const hw = helloWorldGenerator()
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())

// ------------------------------- generator
function *f() {
  return '你好'
  return '世界'
}
console.log(f().next())

// ---------------------遍历器生成函数
const obj = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
    yield 4
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
  console.log('item---:', item)
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
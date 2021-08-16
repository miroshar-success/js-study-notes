function sum(...args){
  console.log('args:',args)
  return args.reduce((prev,next) => prev + next, 0)
}
console.log(sum(1,2,3,4,5)) // 15

// -------------------- 扩展运算符
console.log(...[1,2,3])
console.log(1,...[2,3,4],5)


console.log(Math.max(...[1,2,3,4,5])) // 5
console.log(Math.max.apply(null,[1,2,3,4,5])) // 5

let arr1 = [1,2,3]
let arr2 = [4,5,6]
Array.prototype.push.apply(arr1,arr2)
console.log(arr1) // [1,2,3,4,5,6]

arr1.push(...arr2)
console.log(arr1)

// ------------- 扩展运算符赋值数组, 浅拷贝
let a1 = [{foo:1}]
let a2 = [{bar:2}]

let a3 = [...a1,...a2]
let a4 = a1.concat(a2)

console.log(a3,a4)
a3[0].foo = 'foo'
console.log(a3,a4,a1,a2)

// ---------- 字符串转化为真正的数组
console.log([...'hello world'])


// ---------------------- 实现了Iterator接口的对象
let arrayLike = {
  0:'a',
  1:'b',
  2:'c',
  length: 3
}
console.log(Array.from(arrayLike))  // [a, b, c]
console.log( [].slice.call(arrayLike) ) // [a, b, c]

const go = function*(){
  yield 1
  yield 2
  yield 3
}
console.log([...go()])  // [1, 2, 3]

// -------------------
const s1 = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
console.log(Array.from(s1))
let filter_array = Array.from(s1).filter(item => {
  console.log('item:', item)
})

console.log( Array.from({length:3}) )

// console.log([...s1])

let array = Array.from({length:10},() => Math.random())
console.log('array:',array)


let player = ['kyrie', 'james', 'durant', 'wade']

console.log(player.entries())
console.log(player.keys())
console.log(player.values())

for(let [index,value] of player.entries()){
  console.log('key:',index,value)
}
for(let v of player.values()){
  console.log(v)
}
for(let k of player.keys()){
  console.log(k)
}

let {foo,bar} = {foo:'foo', bar:'bbb'}
console.log('foo:',foo, 'bar:',bar) // foo  bbb


let {firstName,lastName} = {firstName:'kyrie',lastName:'irving'}
console.log(firstName,lastName) // kyrie irving
// 对象的解构赋值跟顺序没有关系
let {f,l} = {l:'james',f:'lebron'}
console.log(f,l)  // lebron james

// 解构不到取undefined
let {m} = {bar:'bar'}
console.log('m:', m)  // undefined

const {log} = console;
log('hello')
log('world')



// ---------------------- 变量名与属性名不一致------------------。
let {x:y} = {x:'aaa'}
console.log('y:',y) // aaa

const {first:fi,last:la} = {first:'hello',last:'world'}
console.log(fi,la)  // hello world



// ----------------------- 对象解构默认值,默认值生效的条件是对象的属性值严格等于undefined
let {a = 3} = {}
console.log('a:',a) // 3

let {b,c = 5} = {b:1}
console.log('b:',b,'c:',c)  // 1  5

let {o:p = 3} = {}
console.log('p:', p)  // 3

let {message:msg = 'something went wrong'} = {}
console.log('msg:',msg) // something went wrong



// 对数组使用对象的解构赋值方法
let array = [1,2,3,4,5]
const {0:first, [array.length-1]:last} = array;
console.log(first,last) // 1 5


let {toString:s} = 123;
let {toString:boo} = true;
console.log('s:',s, 'boo:',boo)
console.log(s === Number.prototype.toString, boo === Boolean.prototype.toString)  // true true


// --------------------------- 函数参数使用解构赋值
function add([x,y]){
  return x + y;
}
console.log(add([1,2])) // 3

// x y 的默认值为0  参数的默认值为 {}
function move({x = 0, y = 0} = {}){
  console.log('arguments',...arguments)
  return [x,y]
}
console.log(move({x:3,y:8}))  // [3,8]
log(move({x:3}))  // [3,0]
log(move({})) // [0,0]
log(move()) // [0,0]


function sum({x = 0, y = 0}){
  return [x, y]
}
log(sum({}))  // 0 0

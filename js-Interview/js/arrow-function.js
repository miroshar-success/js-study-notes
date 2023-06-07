// 箭头函数没有 arguments
const fn = (...args) => {
  // console.log('我是箭头函数➡️', arguments) arguments is not defined
  console.log(args) // [1,2,3,4,5]
}
fn(1,2,3,4,5)

// ---- 无法通过call/apply更改this指向
const m1 = () => {
  console.log('this', this)
}
m1()  // 指向window

m1.call({a: 123}) // 指向window

function hello () {
  const m = () => {
    console.log('父作用域', this)
  }
  return m
}
hello()() // m 指向window

hello.call({a: 1})()  // 指向 {a: 1}

// --------- 没有原型 -------
const m2 = () => {
}
console.log('箭头函数原型',m2.prototype)  //undefined
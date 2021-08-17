//-------------- 指数运算符
console.log(2 ** 2) // 4
console.log(2 ** 10)  // 1024

const message_1 = {
  body: {
    user: {
      firstName: 'kyrie'
    }
  }
}
const message_2 = {
  body: {
  }
}
console.log(message_1.body.user.firstName)  // kyrie
// console.log(message_2.body.user.firstName); //  can not read property 'firstName' of undefined
console.log(message_2?.body?.user?.firstName) // undefined

// ------------------ 函数
const obj_1 = {
  say:function() {
    console.log('hello')
  }
}
const obj_2 = {
  say:'1'
}
obj_1?.say()
// obj_2?.say()

console.log( '' || 'hello') // hello
console.log(false || 'hello') // hello
console.log(0 || 'hello') // hello
console.log(null || 'hello')  // hello
console.log(undefined || 'hello') // hello
console.log(NaN || 'hello') // hello

console.log('' ?? 'hello')  // ''
console.log(false ?? 'hello') // false
console.log(0 ?? 'hello') // 0
console.log(null ?? 'hello')  // hello
console.log(undefined ?? 'hello') // hello
console.log(NaN ?? 'hello') // NaN

// 函数的参数是赋值传递 --------
function changeArgument(x) {
  x = 200
}
let number = 100
changeArgument(number)
console.log(number) // 100

const obj = {
  message: 'hello world'
}
changeArgument(obj)

console.log(obj)  // {message: 'hello world'}

const changeObjectField = (x) => {
  x.a = 1233
}
changeObjectField(obj)  // { message: 'hello world', a: 1233 }

console.log(obj)

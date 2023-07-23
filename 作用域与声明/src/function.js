const textarea = document.querySelector('textarea')
const button = document.querySelector('button')
textarea.value = `
  function sum(a, b) {
    return a + b
  }
`
button.addEventListener('click', function() {
  const result = new Function('a', 'b','return a + b')
  console.log(result)
  console.log(result(10, 20))
}, false)


console.log((function f(){}).constructor === Function)  // true

// ---------- Function创建的函数只能在全局作用域中运行 --------------
var x = 10
function createFunction() {
  var x = 20
  return new Function('return x')
}
const f1 = createFunction()
console.log('name:', f1.name)
console.log(f1())   // 10



// ---------- 在对象中调用 new Function() 创建的函数 -----------
const fn = new Function('console.log(this.name)')
const player = {
  name: 'kyrie',
  fn
}
player.fn()   // kyrie

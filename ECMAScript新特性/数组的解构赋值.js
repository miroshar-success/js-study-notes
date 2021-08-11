let [a,b,c] = [1,2,3]
console.log(a,b,c)  // 1 2 3

let [,,third] = ['foo','baz','bar']
console.log(third)  // bar

let [head,...tail] = [1,2,3,4]
console.log(head,tail)  // 1 [2,3,4]

let [foo,bar] = [1]
console.log(foo,bar)  // 1 undefined


//----------------------- 解构赋值指定默认值
let [baz = true] = []
let [x,y = 'b'] = [1,2]
let [m,n='hello world'] = [1]
console.log('foo:',baz, 'y', y, 'm:',m, 'n:',n)
// foo: true  y:2   m:1   n: hello world


//----------------------  默认值是一个表达式
function f(){
  console.log('ha');
  return '惰性求值'
}
let [k = f()] = [1]
console.log('k:',k) // 1

let [l = f()] = [];
console.log('l:',l) // 惰性求值
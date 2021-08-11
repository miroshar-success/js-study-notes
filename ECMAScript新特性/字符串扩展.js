// 遍历器接口
for(let codePoint of 'foo'){
  console.log(codePoint)  // f o o
}

// 模版字符串
const str = `
<ul>
  <li>Hello World</li>
  <li>World</li>
</ul>
`

console.log('str:', str)

const string = `
<ul>
  <li>Hello World</li>
  <li>World</li>
</ul>
`.trim()

console.log('string:', string)


// 嵌入表达式
const obj = {x:1, y:2}
console.log(`${obj.x}-${obj.y}`)  // 1-2

// 使用函数
function fn(){
  return 'Hello World';
}
console.log(`${fn()}`); // Hello World

// 隐式转换
const player = {}
console.log(`Hello, ${player}`);  // Hello, [object Object]


// fromCharCode() 
console.log(String.fromCharCode(0x20BB7));
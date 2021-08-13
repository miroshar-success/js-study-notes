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

console.log(String.fromCodePoint(0x20BB7));

let st = 'hello world';
for(let i = 0; i < st.length; i ++){
  console.log(st.charAt(i))
}

let array = []
// for(let i = 0; i < st.length; i++){
//   let code = st.charCodeAt(i)
//   array.push(code)
// }
// console.log('array:',array)

for(let i = 0; i < st.length; i++){
  let code = st.codePointAt(i)
  array.push(code)
}
console.log('array:',array)

array.forEach((code) => {
  console.log(String.fromCodePoint(code))
})

// String.fromCodePoint String.fromCharCode 用于从 Unicode 码点返回对应字符
console.log(String.fromCodePoint(104))  // h
console.log(String.fromCharCode(104)) // h

// codePointAt  charCodeAt 指定位置的字符的 Unicode 编码
console.log(st.codePointAt(0))  // 104
console.log(st.charCodeAt(0)) // 104


// includes() startsWith()  endsWith()
console.log(st.includes('h')) // true
console.log(st.startsWith('h')) // true
console.log(st.endsWith('h')) // false


// repeat()
console.log('x'.repeat(4))  // xxxx


const s1 = 'abc     '
const s2 = '      abc'
console.log(s1,s2)
console.log(s1.trim())
console.log(s2.trim())
console.log(s2.trimStart())
console.log(s1.trimEnd())


console.log('aabbc_cc'.replace('c',''))  // aabb_cc
console.log('aabbccc'.replace(/c/g,''));  // aabb
console.log('aabbccc'.replaceAll('c',''));  // aabb


console.log('aabbccc'.replaceAll('b',() => '_')) // aa_ccc


console.log('x'.padStart(5,'0'))  // 0000x
console.log('x'.padEnd(5,'0'))    // x0000
console.log('x'.padStart(5,'000'))  // 0000x
console.log('xxx'.padStart(2,'0')) // xxx
console.log('xxx'.padEnd(2,'0'))  // xxx

console.log('xxx'.padStart(5,'1234567'))    // 12xxx
console.log('xxx'.padEnd(5,'1234567'))  // xxx12
/*
if(原字符串的长度 > 最大长度) {
  返回原字符串
}else{
  if(补全字符串+原字符串 > 最大长度 ){
    原字符串 + 补全字符串 切割1次
  }else{
    原字符串 + 补全字符串重复 并切割1次
  }
}
*/



const temp = []
for (let i = 0; i < 10000000; i++) {
  temp.push(i)
}
let count = 0
console.time('for-of')
for (const number of temp) {
  //
  count += 1
}
console.timeEnd('for-of')  // 115.05ms

console.time('forEach')
let times = 0
temp.forEach(item => {
  //
  times += 1
})
console.timeEnd('forEach')  // 73.238ms

console.time('for')
let s = 0
for (let i = 0; i < temp.length; i++) {
  s += 1  
}
console.timeEnd('for')  // 7.13ms

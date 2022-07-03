// ------------ 对象的遍历 --------------
console.log('---------------------- 对象的遍历 -------------------')
const a = {}
a.b = 'hello'
a.a = 'world'
a.d = '你好'
a.c = '世界'

for(const key in a) {
  console.log(key)  // b a d c
}

for(const key of Object.keys(a)) {
  console.log(key)  // b a d c
}

console.log('-------------- b ------------')
const b = {
  b: 'hello',
  a: 'world',
  d: '你好',
  c: '世界'
}
for(const key of Object.keys(b)) {
  console.log(key)  // b a d c
}
for(const key in b) {
  console.log(key)  // b a d c
}


console.log('--------------- c -------------')
const c = {}
c[1] = 'hello'
c[0] = 'world'
c[3] = '你好'
c[2] = '世界'
for(const key of Object.keys(c)) {
  console.log('c-key', key) // 0 1 2 3
}


const d = {}
d['1'] = 'hello'
d['0'] = 'world'
d['3'] = '你好'
d['2'] = '世界'
for(const key of Object.keys(d)) {
  console.log('d-key', key) // 0 1 2 3
}


const e = {
  a: 'h',
  c: 'e',
  b: 'l',
  2: 'l',
  1: 'o',
  0: 'w'
}
for(const key of Object.keys(e)) {
  console.log('e-key', key)
  // 0 1 2 a c b
}

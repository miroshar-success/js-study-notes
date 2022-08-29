const buffer_1 = Buffer.alloc(5)
const buffer_2 = Buffer.alloc(5, 'a')

console.log(buffer_1, buffer_2) // <Buffer 00 00 00 00 00> / <Buffer 61 61 61 61 61>


const buffer_3 = Buffer.from('hello world', 'utf8')
console.log(buffer_3, buffer_3.toString('utf8'))
// <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64> hello world

const b1 = Buffer.from('hello')
const b2 = Buffer.from('world')
console.log(Buffer.concat([b1, b2]).toString()) // helloworld


// 编码格式
const b3 = Buffer.from('hello, world', 'base64')
console.log(b3) // <Buffer 85 e9 65>
console.log(b3.toString('base64'))

const b4 = Buffer.from('hello, world', 'binary')
console.log(b4) // <Buffer 68 65 6c 6c 6f 2c 20 77 6f 72 6c 64>
console.log(b4.toString('binary'))  // hello, world
console.log(b4.toString())  // hello, world

const b5 = Buffer.from('hello world', 'hex')
console.log(b5) // <Buffer >
console.log(b5.toString('hex'), b5.toString())


const b_1 = Buffer.from('hello')
const b_2 = Buffer.from('world')
console.log(b_1.compare(b_2), b_2.compare(b_1)) // -1, 1
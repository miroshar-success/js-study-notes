require('dotenv').config()

console.log(process.env)
// console.log(process.env.SECRET_KEY)
// console.log(process.env.PRIVATE_KEY)

const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
console.log(dotenv.parse(buf))  // { BASIC: 'basic' }

const result = dotenv.config()
console.log('result', result)
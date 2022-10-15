// string.alphanum()
const Joi = require('joi')

const alphanum_schema = Joi.string().alphanum()
console.log(alphanum_schema.validate('hello'))
console.log(alphanum_schema.validate('123'))
console.log(alphanum_schema.validate('你好生活'))


const upper_case_schema = Joi.string().case('upper')
const lower_case_schema = Joi.string().case('lower')
console.log(upper_case_schema.validate('HELLO'))
console.log(upper_case_schema.validate('hello'))
// { value: 'HELLO' } { value: 'HELLO' }

console.log(lower_case_schema.validate('HELLO'))
console.log(lower_case_schema.validate('hello'))
// { value: 'hello' } { value: 'hello' }



const email_string = Joi.string().email()
console.log(email_string.validate('123454380@qq.com'))
console.log(email_string.validate('123454380')) // value must be a validate email


const string_length = Joi.string().length(6)
console.log(string_length.validate('123456'))
console.log(string_length.validate('1234567')) // "value" length must be 6 characters long


const lowercase_string = Joi.string().lowercase()
console.log(lowercase_string.validate('HELLO WORLD'))
console.log(lowercase_string.validate('hello world'))


const max_string = Joi.string().max(4)
console.log(max_string.validate('1234'))
console.log(max_string.validate('12345'))

const { log } = console
const min_string = Joi.string().min(4)
log(min_string.validate('1234'))
log(min_string.validate('123'))

const trim_string = Joi.string().trim(false) // disable trim flag
log(trim_string.validate('hello '))
log(trim_string.validate('hello world'))
log(trim_string.validate('hello'))
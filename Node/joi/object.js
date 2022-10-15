const Joi = require('joi')
const { log } = console

const object = Joi.object({
  a: Joi.number().min(1).max(10).integer(),
  b: Joi.string()
})

log(object.validate({
  a: 11,
  b: 'hello'
})) // "a" must be less than or equal to 10]

const array = Joi.array().items({ a: Joi.string() })
log(array.validate([{a: 1, b: '123'}])) // "[0].a" must be a string


const append = Joi.object({
  firstName: Joi.string().min(3).max(10),
  lastName: Joi.string().min(3).max(10)
})
append.append({
  age: Joi.number().min(18).max(45)
})
log(append.validate({
  firstName: 'kyrie',
  lastName: 'irving',
  age: 30
})) // "age" is not allowed
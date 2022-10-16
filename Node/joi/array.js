const Joi = require('joi')

const array = Joi.array().items(Joi.string())
console.log(array.validate([1, 2, 3]))  // "[0]" must be a string]
console.log(array.validate(['1', '2', '3']))


/* const has = Joi.array().items(
  Joi.object({
    a: Joi.string(),
    b: Joi.number()
  })
).has(Joi.object({ a: Joi.string().valid('a'), b: Joi.number()})) */

const string_number = Joi.array().items(Joi.string(), Joi.number())
const forbidden_string = Joi.array().items(Joi.string().valid('hello').forbidden(), Joi.string())
const label_string = Joi.array().items(Joi.string().label('hello').required(), Joi.string().required())

const { log } = console
log(string_number.validate(['1', 1, 'a', []]))  // "[3]" does not match any of the allowed types]
log(string_number.validate([1, '1']))

log(forbidden_string.validate(['hello', 'world']))  // "[0]" contains an excluded value

log(label_string.validate(['hello', 'world']))
log(label_string.validate(['hello'])) // "value" does not contain 1 required value(s)


// array.length()
const length = Joi.array().length(5)
console.log(length.validate([1,2,3,4,5]))
log(length.validate([1,2,3])) // "value" must contain 5 items



const max = Joi.array().max(3)
log(max.validate([1,2,3,4]))  // "value" must contain less than or equal to 3 items
log(max.validate([1,2,3]))


const min = Joi.array().min(3)
log(min.validate([1,2,3]))
log(min.validate([1,2]))  // "value" must contain at least 3 items
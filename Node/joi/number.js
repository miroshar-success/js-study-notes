const Joi = require('joi')
const { log } = console

const greater = Joi.number().greater(5)
log(greater.validate(1))  // "value" must be greater than 5
log(greater.validate(10))


const integer = Joi.number().integer()
log(integer.validate(123.456))
log(integer.validate(123))
log(integer.validate('123.456'))
log(integer.validate('123'))


const less = Joi.number().less(10)
log(less.validate(5))
log(less.validate(21)) // "value" must be less than 10
log(less.validate('20'))  // "value" must be less than 10


const max = Joi.number().max(10)
log(max.validate(11)) // "value" must be less than or equal to 10
log(max.validate(5))


const min = Joi.number().min(5)
log(min.validate(6))
log(min.validate(3))  // "value" must be greater than or equal to 5


const precision = Joi.number().precision(3)
log(precision('1.234'))
log(precision('1.2345'))
const { user_model } = require('../model/index')
const Joi = require('joi')

const register = (req, res) => {
  const user_schema = Joi.object({
    username: Joi.string()
    .min(3)
    .max(10).required(),
    password: Joi.string().required(),
    phone: Joi.string().required()
  })
  const schema = Joi.object({
    a: Joi.any().allow('a'),
    b: Joi.any().allow('hello world'),
    c: Joi.any().allow(123)
  })
  console.log(schema.validate({
    a: 'b',
    b: '你好世界',
    c: 456
  }))
  const { error } = user_schema.validate(req.body)
  if (error) {
    res.status(200).json({
      code: 0,
      msg: error.details.map(item => item.message).join('')
    })
  } else {
    res.status(200).json({
      msg: 'success',
      code: 200
    })
  }
}

const update = (req, res) => {

}

module.exports = {
  register,
  update
}
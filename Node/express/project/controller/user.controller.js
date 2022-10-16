const { user_model } = require('../model/index')
const { create_token } = require('../util/jwt')
const Joi = require('joi')
const md5 = require('md5')
// 用户注册
const register = async (req, res) => {
  const user_schema = Joi.object({
    username: Joi.string()
    .min(3)
    .max(10).required(),
    password: Joi.string().required(),
    phone: Joi.string().length(11).required()
  })
  const { error } = user_schema.validate(req.body)
  if (error) {
    return res.status(200).json({
      code: 0,
      msg: error.details.map(item => item.message).join('')
    })
  }
  const has_register = await user_model.findOne({ username: req.body.username })
  if (has_register) {
    return res.status(200).json({
      msg: `${req.body.username} has been registered`,
      code: 0
    })
  }
  try {
    await user_model.create({ ...req.body, password: md5(req.body.password) })
    res.json({
      msg: 'success',
      code: 200
    })
  } catch(err) {
    res.json({
      msg: err,
      code: 0
    })
  }
}

// 用户登陆
const login = async (req, res) => {
  const { error } = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().required()
  }).validate(req.body)
  if (error) {
    return res.status(200).json({
      code: 0,
      msg: error.details.map(item => item.message).join('') 
    })
  }
  try {
    const { username, password } = req.body
    const user = await user_model.findOne({ username, password: md5(password) })
    console.log(user)
    if (user) {
      const token = create_token({username})
      console.log(token)
      res.json({
        msg: '登陆成功',
        code: 200
      })
    } else {
      res.json({
        msg: '用户名或密码错误',
        code: 0
      })
    }
  } catch(err) {
    console.log(err)
    res.json({
      msg: err,
      code: 0
    })
  }
}

const update = (req, res) => {

}

module.exports = {
  register,
  update,
  login
}
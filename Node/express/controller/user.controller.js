const { user_model, subscribe_model } = require('../model/index')
const { create_token, verify_token } = require('../util/jwt')
const { parse_token } = require('../middleware/user-validate')
const Joi = require('joi')
const md5 = require('md5')

// 用户注册
const register_schema = Joi.object({
  username: Joi.string()
  .min(3)
  .max(10).required(),
  password: Joi.string().required(),
  phone: Joi.string().length(11).required()
})
const register = async (req, res) => {
  const { error } = register_schema.validate(req.body)
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
const login_schema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string().required()
})
const login = async (req, res) => {
  const { error } = login_schema.validate(req.body)
  if (error) {
    return res.status(200).json({
      code: 0,
      msg: error.toString()
    })
  }
  try {
    const { username, password } = req.body
    const user = await user_model.findOne({ username, password: md5(password) })
    if (user) {
      const token = create_token({ username, id: user._id, phone: user.phone })
      res.json({
        msg: '登陆成功',
        token,
        code: 200
      })
    } else {
      res.json({
        msg: '用户名或密码错误',
        code: 0
      })
    }
  } catch(err) {
    res.json({
      msg: err,
      code: 0
    })
  }
}

// 用户信息更新
const update_user_schema = Joi.object({
  username: Joi.string().required(),
  phone: Joi.string().required()
})
const update = async (req, res) => {
  const { error } = update_user_schema.validate(req.body)
  if (error) {
    return res.json({
      msg: error.toString(),
      code: 200
    })
  }
  const { username, phone } = req.body
  const findUser = await user_model.findOne({ username })
  if (findUser) return res.json({
    code: 0,
    msg: `用户名 ${username} 已占用, 请修改`
  })
  const findPhone = await user_model.findOne({ phone })
  if (findPhone) return res.json({
    code: 0,
    msg: `手机号 ${phone } 已经被使用`
  })
  const result = await user_model.findByIdAndUpdate(req.user.id, {
    username,
    phone
  })
  if (result) return res.json({
    msg: '更新成功',
    code: 200
  })
  res.json({
    msg: '更新失败',
    code: 0
  })
}

// 获取自己订阅的用户列表
const get_self_subscribe_list = async (req, res) => {
  const { id } = req.user
  try {
    const list = await subscribe_model.find({user: id}).populate({
      path: 'channel',
      select: '_id, username',
      strictPopulate: false,
    })
    if (list) {
      return res.status(200).json({
        code: 200,
        data: list
      })
    }
    return res.status(200).json({
      code: 0,
      data: []
    })
  } catch(err) {
    return res.status(200).join({
      code: 0,
      data: []
    })
  }
}

// 获取某个用户信息
const user_schema = Joi.object({
  user_id: Joi.string().required()
})
const get_channel_detail = async (req, res) => {
  let is_subscribe = false
  const { error } = user_schema.validate(req.params)
  if (error) {
    return res.status(200).json({
      code: 0,
      msg: error.details.map(item => item.message).join('')
    })
  }
  // 如果登陆了, 是否关注了该用户
  try {
    const token = parse_token(req)
    if (token) {
      const user = verify_token(token)
      const data = await subscribe_model.findOne({
        user: user.id,
        channel: req.params.user_id
      })
      if (data) {
        is_subscribe = true
      }
    }
    const user = await user_model.findById(req.params.user_id)
    res.status(200).json({
      code: 200,
      data: {
        is_subscribe,
        user_id: user._id,
        username: user.username,
        subscribe_count: user.subscribe_count
      }
    })
  } catch(err) {
    res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

// 获取他人关注的用户列表
const get_other_subscribe_list = async (req, res) => {
  const { error } = user_schema.validate(req.params)
  if (error) return res.status(200).json({
    code: 0,
    msg: error.details
  })
  try {
    const data = await subscribe_model.find({
      user: req.params.user_id
    }).populate({
      path: 'channel',
      strictPopulate: false,
      select: '_id, username'
    })
    res.status(200).json({
      code: 200,
      data
    })
  }catch(err) {
    res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

module.exports = {
  get_self_subscribe_list,
  get_other_subscribe_list,
  get_channel_detail,
  register,
  update,
  login
}
const Joi = require('joi')
const { subscribe_model, user_model } = require('../model/index')

const subscribe_schema = Joi.object({
  user_id: Joi.string().required()
})

// 关注人
const subscribe_user = async (req, res) => {
  // 验证参数
  const { error } = subscribe_schema.validate(req.body)
  if (error) {
    return res.status(200).json({
      code: 0,
      msg: error.details.map(item => item.message).join('')
    })
  }
  // 当前登陆的用户id
  const { id } = req.user
  // 订阅的用户id
  const { user_id } = req.body
  if (id === user_id) return res.status(200).json({
    code: 0,
    msg: '不能关注自己发布的视频'
  })
  try {
    const result = await subscribe_model.findOne({
      user: id,
      channel: user_id
    })
    if (!result) {
      await subscribe_model.create({
        user: id,
        channel: user_id
      })
      const channel = await user_model.findById(user_id)
      if (!channel) return res.status(200).json({
        code: 0,
        msg: '关注用户查询失败'
      })
      await user_model.findByIdAndUpdate(user_id, {
        subscribe_count: channel.subscribe_count + 1
      })
      return res.status(200).json({
        code: 200,
        msg: '关注成功'
      })
    }
    return res.status(200).json({
      code: 200,
      msg: '已经关注该用户'
    })
  } catch (err) {
    return res.status(0).json({
      code: 0,
      msg: err
    })
  }
}

// 取消关注
const unsubscribe_user = async (req, res) => {
  const { error } = subscribe_schema.validate(req.body)
  if (error) return res.status(200).json({
    code: 0,
    msg: error.details.map(item => item.message).join('')
  })
  const { id } = req.user
  const { user_id } = req.body
  try {
    const result = await subscribe_model.findOne({
      user: id,
      channel: user_id
    })
    if (result) {
      await subscribe_model.deleteOne({ user: id, channel: user_id })
      const channel = await user_model.findById(user_id)
      if (!channel) return res.status(200).json({
        code: 0,
        msg: '未查询到用户信息'
      })
      await user_model.findByIdAndUpdate(user_id, {
        subscribe_count: channel.subscribe_count - 1
      })
      return res.status(200).json({
        code: 0,
        msg: '取消关注成功'
      })
    }
    return res.status(200).json({
      code: 0,
      msg: '未关注该用户'
    })
  } catch(err) {
    return res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

module.exports = {
  subscribe_user,
  unsubscribe_user
}
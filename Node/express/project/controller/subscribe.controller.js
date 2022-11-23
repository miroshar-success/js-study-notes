const Joi = require('joi')

const subscribe_schema = Joi.object({
  user_id: Joi.string().required(),
  video_id: Joi.string().required()
})

const subscribe_video = async (req, res) => {
  // 验证参数
  const { error } = subscribe_schema.validate(req.body)
  if (error) {
    return res.status(200).json({
      code: 0,
      msg: error.details.map(item => item.message).join('')
    })
  }
  res.status(200).json({
    code: 0,
    data: []
  })
}

module.exports = {
  subscribe_video
}
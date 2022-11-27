const Joi = require('joi')
const { default: mongoose } = require('mongoose')
const { video_model, video_comment_model } = require('../model/index')

// 评论视频
const comment_schema = Joi.object({
  id: Joi.string().required(),
  content: Joi.string().required()
})
const video_comment = async (req, res) => {
  const { error } = comment_schema.validate(req.body)
  if (error) return res.status(200).json({
    code: 0,
    msg: error.details.map(item => item.message).join('')
  })
  try {
    const { content, id } = req.body
    const video = await video_model.findById(id)
    if (!video) return res.status(200).json({
      code: 0,
      msg: '未查找到视频'
    })
    await video_comment_model.create({
      content: content.trim(),
      user: req.user.id,
      video: id
    })
    await video_model.findByIdAndUpdate(id, {
      comment_count: video.comment_count + 1
    })
    res.status(200).json({
      code: 200,
      msg: '评论成功'
    })
  } catch (err) {
    res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

// 获取视频评论列表
const video_comment_schema = Joi.object({
  id: Joi.string().required()
})
const video_comment_list = async (req, res) => {
  console.log(req.params)
  const { error } = video_comment_schema.validate(req.params)
  if (error) return res.status(200).json({
    code: 0,
    msg: error.details.map(item => item.message).join('')
  })
  try {
    const list = await video_comment_model.find({ video: req.params.id })
      .populate({
        path: 'user',
        select: 'username _id'
      })
    res.status(200).json({
      code: 200,
      data: list || []
    })
  } catch (err) {
    res.status(200).json({
      code: 200
    })
  }
}

// 删除视频评论
const delete_schema = Joi.object({
  video_id: Joi.string().required(),
  comment_id: Joi.string().required()
})
const delete_video_comment = async (req, res) => {
  const { error } = delete_schema.validate(req.body)
  if (error) return res.status(200).json({
    code: 0,
    msg: error.details.map(item => item.message).join('')
  })
  try {
    const { video_id, comment_id } = req.body
    const video = await video_model.findById(video_id)
    if (!video) return res.status(200).json({
      code: 0,
      msg: '视频不存在'
    })
    const comment = await video_comment_model.findById(comment_id)
    if (!comment) return res.status(200).json({
      code: 0,
      msg: '评论不存在'
    })
    // 是否当前用户
    if (!(comment.user.toString() === req.user.id)) {
      return res.status(200).json({
        code: 0,
        msg: '无法删除该评论'
      })
    }
    await video_comment_model.findOneAndRemove({
      video: video_id,
      _id: comment_id
    })
    // 删除视频的评论数量
    const count = video.comment_count - 1
    await video_model.findByIdAndUpdate(video_id, {
      comment_count: count
    })
    res.status(200).json({
      code: 200,
      msg: '删除成功'
    })
  } catch(err) {
    res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

module.exports = {
  video_comment,
  video_comment_list,
  delete_video_comment
}
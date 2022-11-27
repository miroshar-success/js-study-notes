const { video_model, video_thumb_model } = require('../model/index')
const Joi = require('joi')

const TYPE_DISLIKE = 2
const TYPE_LIKE = 1

const thumb_schema = Joi.object({
  video_id: Joi.string().required(),
  type: Joi.number().required()
})

// 视频点赞和点踩
const video_thumb = async (req, res) => {
  const { error } = thumb_schema.validate(req.body)
  if (error) return res.status(200).json({
    code: 0,
    msg: error.details.map(item => item.message).join('')
  })
  try {
    const { video_id, type } = req.body
    const video = await video_model.findById(video_id)
    if (!video) return res.status(200).json({
      code: 0,
      msg: '视频不存在'
    })
    const thumb_video = await video_thumb_model.findOne({
      user: req.user.id,
      video: video_id
    })
    const _type = Number(type)
    if (thumb_video) {
      let { like, dislike } = thumb_video
      if ((like && _type === TYPE_LIKE) || (dislike && _type === TYPE_DISLIKE)) {
        await video_thumb_model.findOneAndRemove({
          user: req.user.id,
          video: video_id
        })
      } else {
        if (_type === TYPE_LIKE) {
          dislike = false
          like = true
        }
        if (_type === TYPE_DISLIKE) {
          dislike = true
          like = false
        }
        await video_thumb_model.findOneAndUpdate({
          user: req.user.id,
          video: video_id
        }, { dislike, like })
      }
    } else {
      await video_thumb_model.create({
        user: req.user.id,
        video: video_id,
        like: _type === TYPE_LIKE,
        dislike: _type === TYPE_DISLIKE
      })
    }
    // 查找点赞 和 点踩 的数量
    const like_counts = await video_thumb_model.countDocuments({
      video: video_id,
      user: req.user.id,
      like: true
    })
    const dislike_counts = await video_thumb_model.countDocuments({
      video: video_id,
      user: req.user.id,
      dislike: true
    })
    await video_model.findByIdAndUpdate(video_id, {
      like: like_counts,
      dislike: dislike_counts
    })
    res.status(200).json({
      code: 200,
      msg: '操作成功'
    })
  } catch(err) {
    return res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

module.exports = {
  video_thumb
}
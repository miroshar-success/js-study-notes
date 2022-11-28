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
    let like = false, dislike = false
    if (thumb_video) {
      like = thumb_video.like
      dislike = thumb_video.dislike
      if ((like && _type === TYPE_LIKE) || (dislike && _type === TYPE_DISLIKE)) {
        await video_thumb_model.findOneAndRemove({
          user: req.user.id,
          video: video_id
        })
        if (_type === TYPE_LIKE) {
          like = false
        }
        if (_type === TYPE_DISLIKE) {
          dislike = false
        }
      } else {
        if (_type === TYPE_LIKE) {
          like = true
          dislike = false
          await video_thumb_model.findOneAndUpdate({
            user: req.user.id,
            video: video_id
          }, {
            like,
            dislike
          })
        }
        if (_type === TYPE_DISLIKE) {
          like = false
          dislike = true
          await video_thumb_model.findOneAndUpdate({
            user: req.user.id,
            video: video_id
          }, {
            like,
            dislike
          })
        }
      }
    } else {
      if (_type === TYPE_LIKE) {
        like = true
      }
      if (_type === TYPE_DISLIKE) {
        dislike = true
      }
      await video_thumb_model.create({
        user: req.user.id,
        video: video_id,
        like,
        dislike
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
      like_count: like_counts,
      dislike_count: dislike_counts
    })
    res.status(200).json({
      code: 200,
      msg: '操作成功',
      data: {
        like,
        dislike
      }
    })
  } catch(err) {
    return res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

// 点赞/点踩的视频列表
const thumb_type_schema = Joi.object({
  type: Joi.number().integer().max(2).required()
})
const search_thumb_thumb_list = async (req, res) => {
  const { error } = thumb_type_schema.validate(req.body)
  if (error) return res.status(200).json({
    code: 0,
    msg: error.details.map(item => item.message).join('')
  })
  const { id } = req.user
  try {
    const condition = Number(req.body.type) === TYPE_LIKE
    ? {
      like: true,
      dislike: false
    } : {
      like: false,
      dislike: true
    }
    const list = await video_thumb_model.find({
      user: id,
      ...condition
    }).populate({
      path: 'video'
    })
    res.status(200).json({
      code: 200,
      data: list
    })
  } catch(err) {
    res.status(200).json({
      code: 0,
      msg: err
    })
  }
}

module.exports = {
  video_thumb,
  search_thumb_thumb_list
}
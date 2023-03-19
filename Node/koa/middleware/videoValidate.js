const Joi = require('joi')
/**
 * @description 验证视频上传的参数
*/
const videoUploadSchema = Joi.object({
  title: Joi.string().required(),
  user_id: Joi.string().required(),
  description: Joi.string(),
  file: Joi.any().required()
})

const videoUploadValidate = async (ctx, next) => {
  try {
    const { id } = ctx.userinfo
    const { error } = videoUploadSchema.validate({ ...ctx.request.body, user_id: id, file: ctx.request.files })
    if (error) return ctx.body = {
      msg: error,
      code: 0
    }
    await next()
  } catch(err) {
    console.log(err)
  }
}

/**
 * @description 验证视频评论的参数
*/
const videoCommentSchema = Joi.object({
  video_id: Joi.string().required(),
  user_id: Joi.string().required(),
  content: Joi.string().required()
})
const videoCommentValidate = async (ctx, next) => {
  try {
    const { id } = ctx.userinfo
    const { id: video_id, content } = ctx.request.body || {}
    const { error } = videoCommentSchema.validate({ video_id, content , user_id: id })
    if (error) return ctx.body = {
      msg: error,
      code: 0
    }
    await next()
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  videoUploadValidate,
  videoCommentValidate
}
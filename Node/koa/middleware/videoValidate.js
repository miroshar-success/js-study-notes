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

module.exports = {
  videoUploadValidate
}
const Joi = require('joi')
/**
 * @description 用户注册验证器
*/
const registerSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  password: Joi.string().required()
})

const userRegisterValidate = async (ctx, next) => {
  const { username, password } = ctx.request.body
  console.log(username, password)
  const { error } = registerSchema.validate({ username, password })
  if (error) {
    return ctx.body = {
      code: 0,
      msg: error.details.map(item => item.message).join()
    }
  }
  await next()
}

module.exports = {
  userRegisterValidate
}

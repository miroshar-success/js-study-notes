const Joi = require('joi')
const { verify_token } = require('../utils/user-validate')
const userSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  password: Joi.string().required()
})

/**
 * @description 用户注册验证器
*/
const userRegisterValidate = async (ctx, next) => {
  const { username, password } = ctx.request.body
  const { error } = userSchema.validate({ username, password })
  if (error) {
    return ctx.body = {
      code: 0,
      msg: error.details.map(item => item.message).join()
    }
  }
  await next()
}

/**
 * @description 用户登陆验证
*/
const userLoginValidate = async (ctx, next) => {
  const { username, password } = ctx.request.body
  const { error } = userSchema.validate({ username, password })
  if (error) {
    ctx.body = {
      code: 0,
      msg: error.details.map(item => item.message).join()
    }
  }
  await next()
}

/**
 * @description 验证用户登陆
*/
const userTokenValidate = (required = true) => {
  return async (ctx, next) => {
    if (required) {
      const token = (ctx.headers.authorization || '').split('Bearer ')[1]
      if (!token) return ctx.body = {
        msg: '请传入token',
        code: 1
      }
      try {
        const t = verify_token(token)
        if (!t) {
          ctx.body = {
            msg: '请传入合法token',
            code: 1
          }
        } else {
          ctx.userinfo = t
          await next()
        }
      } catch (err) {
        ctx.body = {
          msg: err,
          code: 0
        }
      }
    } else {
      await next()
    }
  }
}

module.exports = {
  userRegisterValidate,
  userLoginValidate,
  userTokenValidate
}

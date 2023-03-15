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
  const { username, password } = ctx.request.body || {}
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
  const { username, password } = ctx.request.body || {}
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
 * @description 验证用户登陆
*/
const userTokenValidate = (required = true) => {
  return async (ctx, next) => {
    if (required) {
      const token = (ctx.headers.authorization || '').split('Bearer ')[1]
      if (!token) return ctx.body = {
        msg: '请传入token',
        code: 0
      }
      try {
        const t = verify_token(token)
        if (!t) {
          ctx.body = {
            msg: '请传入合法token',
            code: 0
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

/**
 * @description 修改自己的信息
*/
const modifyUserSchema = Joi.object({
  user_id: Joi.string().required(),
  phone: Joi.string().default(''),
  personal_signature: Joi.string().default(''),
  avatar: Joi.string().default(''),
  address: Joi.string().default(''),
  school: Joi.string().default(''),
  sex: Joi.number().default(1)
})
const modifyUserValidate = async (ctx, next) => {
  const user_id = ctx.userinfo.id
  const { error } = modifyUserSchema.validate({...ctx.request.body, user_id } || {})
  if (error) {
    return ctx.body = {
      code: 0,
      msg: error
    }
  }
  await next()
}
module.exports = {
  userRegisterValidate,
  userLoginValidate,
  userTokenValidate,
  modifyUserValidate
}

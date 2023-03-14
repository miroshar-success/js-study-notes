const md5 = require('md5')
const { gen_token } = require('../utils/user-validate')
const { UserModel } = require('../model/index')
/**
 * @description 用户注册接口
*/
const register = async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    const findUser = await UserModel.findOne({ username })
    if (findUser) {
      ctx.body = {
        code: 0,
        msg: `${username} 已经注册`
      }
    } else {
      await UserModel.create({
        username,
        password: md5(password)
      })
      ctx.body = {
        code: 200,
        msg: '账号注册成功'
      }
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: err
    }
  }
}

/**
 * @description 用户登陆
*/
const login = async (ctx) => {
  const { username, password } = ctx.request.body
  try {
    const findUser = UserModel.findOne({ username, password: md5(password)})
    if (!findUser) {
      return ctx.body = {
        code: 0,
        msg: '用户名或密码错误'
      }
    }
    const token = gen_token({ username })
    ctx.body = {
      token,
      msg: '登陆成功',
      code: 1
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: err
    }
  }
}

module.exports = {
  register,
  login
}
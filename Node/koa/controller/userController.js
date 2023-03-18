const md5 = require('md5')
const { gen_token } = require('../utils/user-validate')
const { userModel, userInfoModel } = require('../model/index')
/**
 * @description 用户注册接口
*/
const register = async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    const findUser = await userModel.findOne({ username })
    if (findUser) {
      ctx.body = {
        code: 0,
        msg: `${username} 已经注册`
      }
    } else {
      await userModel.create({
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
    const findUser = await userModel.findOne({ username, password: md5(password) })
    if (!findUser) {
      return ctx.body = {
        code: 0,
        msg: '用户名或密码错误'
      }
    }
    const token = gen_token({ username, id: findUser._id })
    ctx.body = {
      token,
      msg: '登陆成功',
      code: 200
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: err
    }
  }
}

/**
 * @description 更新用户信息
*/
const user_modify = async (ctx) => {
  const { id, username } = ctx.userinfo
  const findUser = await userModel.findById(id)
  if (!findUser) {
    return ctx.body = {
      code: 0,
      msg: `用户 ${username} 不存在`
    }
  }
  try {
    const data = { user: id, ...ctx.request.body}
    await userInfoModel.create(data)
    ctx.body = {
      code: 200,
      msg: '保存成功'
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: err
    }
  }
}

/**
 * @description 获取用户信息
*/
const get_userinfo = async (ctx) => {
  const { id } = ctx.userinfo
  try {
    const userinfo = await userInfoModel.findOne({ user: id }).populate({
      path: 'user',
      strictPopulate: false,
      select: 'username _id'
    })
    ctx.body = {
      code: 200,
      data: userinfo
    }
  } catch(err) {
    ctx.body = {
      code: 0,
      msg: err
    }
  }
}

module.exports = {
  register,
  login,
  user_modify,
  get_userinfo
}
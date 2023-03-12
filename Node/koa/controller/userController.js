const md5 = require('md5')
const { User } = require('../model/index')

const register = async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    const findUser = await User.findOne({ username })
    if (findUser) {
      ctx.body = {
        code: 0,
        msg: `${username} 已经注册`
      }
    } else {
      await User.create({
        username,
        password: md5(password)
      })
    }
  } catch (err) {
    console.log(err)
  }
}

const login = async (ctx) => {
  
}

module.exports = {
  register,
  login
}
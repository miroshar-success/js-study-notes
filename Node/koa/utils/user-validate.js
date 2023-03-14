const jwt = require('jsonwebtoken')

/**
 * @desciption 下发token
*/
const key = 'node_koa'

const gen_token = (userinfo) => {
  const token = jwt.sign(userinfo, key, {
    expiresIn: '1 day'
  })
  return token
}

/**
 * @description 解析token
*/
const verify_token = (token) => {
  try {
    const userinfo = jwt.verify(token, key)
    return userinfo
  } catch (err) {
    return null
  }
}

module.exports = {
  verify_token,
  gen_token
}
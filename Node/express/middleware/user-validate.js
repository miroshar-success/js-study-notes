const { verify_token } = require('../util/jwt')

const parse_token = (req) => {
  const authorization = req.headers.authorization || ''
  if (!authorization) return false
  const token = authorization.split('Bearer ')[1]
  if (!token) return false
  return token
}

// 用户登陆token验证
const user_validate = (req, res, next) => {
  const token = parse_token(req)
  if (!token) return res.status(200).json({
    code: 0,
    msg: '请携带token'
  })
  try {
    const user_info = verify_token(token)
    req.user = user_info
    next()
  } catch(err) {
    return res.json({
      code: 0,
      msg: 'token无效'
    })
  }
}


module.exports = {
  user_validate,
  parse_token
}
const { verify_token } = require('../util/jwt')
// const { user_model } = require('../model/index')

// 用户登陆token验证
const user_validate = (req, res, next) => {
  const authorization = req.headers.authorization || ''
  if (!authorization) {
    return res.json({
      msg: '请携带token',
      code: 0
    })
  }
  const token = authorization.split('Bearer ')[1]
  if (!token) {
    return res.json({
      msg:'token无效',
      code: 0
    })
  }
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
  user_validate
}
const jwt = require('jsonwebtoken')
const secret_string = 'express_project'

const create_token = (info) => {
  return jwt.sign(info, secret_string, {
    expiresIn: '1h'
  })
}

const verify_token = (token) => {
  return jwt.verify(token, secret_string)
}

module.exports = {
  create_token,
  verify_token
}
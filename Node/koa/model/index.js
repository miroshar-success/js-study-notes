const mongoose = require('mongoose')
const { userSchema, userInfoSchema } = require('./userModel')

module.exports = {
  userModel: mongoose.model('user', userSchema),
  userInfoModel: mongoose.model('user-info', userInfoSchema)
}
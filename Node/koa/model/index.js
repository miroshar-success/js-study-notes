const mongoose = require('mongoose')
const { userRegisterSchema } = require('./userModel')

module.exports = {
  UserModel: mongoose.model('User', userRegisterSchema),
  // UserInfoModel: mongoose.model('UserInfo', userInfoSchema)
}
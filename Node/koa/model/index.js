const mongoose = require('mongoose')
const { userSchema, userInfoSchema } = require('./userModel')
const videoSchema = require('./videoModel')
const videoCommentSchema = require('./videoCommentModel')

module.exports = {
  userModel: mongoose.model('User', userSchema),
  userInfoModel: mongoose.model('UserInfo', userInfoSchema),
  videoModel: mongoose.model('Video', videoSchema),
  videoCommentModel: mongoose.model('VideoComment', videoCommentSchema)
}
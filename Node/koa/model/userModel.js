const mongoose = require('mongoose')
/**
 * @description 用户注册表
*/
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  password: {
    type: String,
    required: true
  }
})

/**
 * @description 用户信息表
*/
const userInfoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  phone: {
    type: String,
    default: ''
  },
  personal_signature: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  school: {
    type: String,
    default: ''
  },
  sex: {
    type: Number,
    default: 1
  }
})

module.exports = {
  userSchema,
  userInfoSchema
}
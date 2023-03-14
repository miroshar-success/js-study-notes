const mongoose = require('mongoose')
/**
 * @description 用户注册表
*/
const userRegisterSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true
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
  phone: {
    type: Number,
  },
  password: {
    type: String,
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
  userRegisterSchema,
  userInfoSchema
}
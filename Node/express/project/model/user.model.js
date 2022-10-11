const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 15
  },
  avatar: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    unique: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('user', userSchema)

module.exports = {
  User
}
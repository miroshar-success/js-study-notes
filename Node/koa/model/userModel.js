const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    maxLength: 20,
    minLength: 6
  },
  password: {
    type: String,
    required: [true, 'Phone is required']
  }
})

module.exports = userSchema
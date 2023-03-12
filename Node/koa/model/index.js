const mongoose = require('mongoose')
const userModel = require('./userModel')

module.exports = {
  User: mongoose.model('User', userModel)
}